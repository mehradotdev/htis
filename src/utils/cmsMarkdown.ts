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

function getSafeHexColor(color: string): string | null {
  const trimmedColor = color.trim().toLowerCase();

  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(trimmedColor) ? trimmedColor : null;
}

export function renderCmsInlineMarkdown(
  value: string | null | undefined,
  linkClassName = '',
): string {
  if (!value) return '';

  const inlinePattern =
    /\[([^\]\n]+)\]\(([^)\s]+)\)|\[([^\]\n]+)\]\{color\s*=\s*([^}\s]+)\}/g;
  const linkClass = `${CMS_LINK_BASE_CLASS} ${
    linkClassName || CMS_LINK_DEFAULT_COLOR_CLASS
  }`;
  let rendered = '';
  let lastIndex = 0;

  for (const match of value.matchAll(inlinePattern)) {
    const [rawMatch, linkLabel, href, colorLabel, color] = match;
    const matchIndex = match.index ?? 0;

    rendered += escapeHtml(value.slice(lastIndex, matchIndex));

    if (href) {
      const safeHref = getSafeHref(href);

      if (!safeHref) {
        rendered += escapeHtml(rawMatch);
        lastIndex = matchIndex + rawMatch.length;
        continue;
      }

      const isExternal = /^https?:\/\//i.test(safeHref);
      const externalAttributes = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';

      rendered += `<a href="${escapeHtml(safeHref)}" class="${escapeHtml(linkClass)}"${externalAttributes}>${escapeHtml(linkLabel)}</a>`;
    } else {
      const safeColor = getSafeHexColor(color);

      if (!safeColor) {
        rendered += escapeHtml(rawMatch);
        lastIndex = matchIndex + rawMatch.length;
        continue;
      }

      rendered += `<span style="color: ${escapeHtml(safeColor)}">${escapeHtml(colorLabel)}</span>`;
    }

    lastIndex = matchIndex + rawMatch.length;
  }

  rendered += escapeHtml(value.slice(lastIndex));
  return rendered;
}
