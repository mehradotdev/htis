const CMS_LINK_BASE_CLASS =
  'font-semibold underline underline-offset-4 decoration-current transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';
const CMS_LINK_DEFAULT_COLOR_CLASS = 'text-primary hover:text-secondary';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSafeHref(href: string): string | null {
  const trimmedHref = href.trim();

  if (
    trimmedHref.startsWith('/') ||
    trimmedHref.startsWith('#') ||
    trimmedHref.startsWith('./') ||
    trimmedHref.startsWith('../')
  ) {
    return trimmedHref;
  }

  try {
    const url = new URL(trimmedHref);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)
      ? trimmedHref
      : null;
  } catch {
    return null;
  }
}

export function renderCmsInlineMarkdown(value: string, linkClassName = ''): string {
  const linkPattern = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  const linkClass = `${CMS_LINK_BASE_CLASS} ${
    linkClassName || CMS_LINK_DEFAULT_COLOR_CLASS
  }`;
  let rendered = '';
  let lastIndex = 0;

  for (const match of value.matchAll(linkPattern)) {
    const [rawMatch, label, href] = match;
    const matchIndex = match.index ?? 0;
    const safeHref = getSafeHref(href);

    rendered += escapeHtml(value.slice(lastIndex, matchIndex));

    if (safeHref) {
      const isExternal = /^https?:\/\//i.test(safeHref);
      const externalAttributes = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';

      rendered += `<a href="${escapeHtml(safeHref)}" class="${escapeHtml(linkClass)}"${externalAttributes}>${escapeHtml(label)}</a>`;
    } else {
      rendered += escapeHtml(rawMatch);
    }

    lastIndex = matchIndex + rawMatch.length;
  }

  rendered += escapeHtml(value.slice(lastIndex));
  return rendered;
}
