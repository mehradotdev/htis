<script>
  let active = $state('collapsed');
  let gridRef = $state();

  const services = [
    {
      id: 'telecom',
      titleHtml: 'Tele&shy;communica&shy;tions',
      stats: [
        { val: '100+', label: 'Network<br/>Deployment' },
        { val: '11+', label: 'Years of<br/>Experience' },
        { val: '91+', label: 'Enterprise<br/>Clients' },
        { val: '99%', label: 'Uptime' },
      ],
      icons: [
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />',
          label: 'Wireless<br/>Solutions',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
          label: 'Network<br/>Security',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
          label: 'Fiber<br/>Deployment',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.665-4.665M5.25 5.25l2.25 3.182m0 0h3.182m-3.182 0l-3.182 3.182m0 0v-3.182m0 3.182l3.182 3.182" />',
          label: 'RF<br/>Engineering',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />',
          label: 'AMC<br/>Support',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />',
          label: 'Telecom<br/>Maintenance',
        },
      ],
    },
    {
      id: 'manpower',
      titleHtml: 'Manpower Services',
      stats: [
        { val: '500+', label: 'IT<br/>Professionals' },
        { val: '11+', label: 'Years of<br/>Experience' },
        { val: '50+', label: 'Corporate<br/>Partners' },
        { val: '98%', label: 'Success<br/>Rate' },
      ],
      icons: [
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.492M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />',
          label: 'IT Staff<br/>Augmentation',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />',
          label: 'Temporary<br/>Hiring',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />',
          label: 'Executive<br/>Search',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V8.25zM6.75 21v-3.375c0-.621.504-1.125 1.125-1.125H11.25c.621 0 1.125.504 1.125 1.125V21" />',
          label: 'Contract to<br/>Hire',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />',
          label: 'Payroll<br/>Management',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />',
          label: 'Project<br/>Teams',
        },
      ],
    },
    {
      id: 'software',
      titleHtml: 'Software<br class="hidden md:block" /> Development',
      stats: [
        { val: '200+', label: 'Projects<br/>Delivered' },
        { val: '50+', label: 'Tech<br/>Experts' },
        { val: '15+', label: 'Tech<br/>Stacks' },
        { val: '100%', label: 'Code<br/>Quality' },
      ],
      icons: [
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />',
          label: 'Custom<br/>Software',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />',
          label: 'App<br/>Development',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />',
          label: 'Cloud<br/>Solutions',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />',
          label: 'Database<br/>Design',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />',
          label: 'Web<br/>Applications',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.829 1.58-1.995 1.056-.19 1.956-1.025 2.062-2.095M9.75 18v-.192c0-.983-.658-1.829-1.58-1.995-1.056-.19-1.956-1.025-2.062-2.095M15 11.25v.75m-6-.75v.75m6-3v.75m-6-.75v.75m6-3v.75m-6-.75v.75m6-3v.75m-6-.75v.75" />',
          label: 'QA &<br/>Testing',
        },
      ],
    },
    {
      id: 'system',
      titleHtml: 'System<br class="hidden md:block" /> Integrations',
      stats: [
        { val: '150+', label: 'Systems<br/>Integrated' },
        { val: '99.9%', label: 'Reliability' },
        { val: '24/7', label: 'Monitoring' },
        { val: '10+', label: 'Years<br/>Expertise' },
      ],
      icons: [
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />',
          label: 'API<br/>Integration',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />',
          label: 'IoT<br/>Solutions',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />',
          label: 'Legacy<br/>Modernization',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />',
          label: 'Data<br/>Center',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
          label: 'Security<br/>Systems',
        },
        {
          svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />',
          label: 'Enterprise<br/>Systems',
        },
      ],
    },
  ];

  // 5x5 geometric grid mapping - Perfect 4x4 Expanded Square
  const stateLayouts = {
    collapsed: {
      titles: {
        telecom: { c: 0, r: 0, cs: 2.5, rs: 2.5 },
        software: { c: 2.5, r: 0, cs: 2.5, rs: 2.5 },
        system: { c: 0, r: 2.5, cs: 2.5, rs: 2.5 },
        manpower: { c: 2.5, r: 2.5, cs: 2.5, rs: 2.5 },
      },
      icons: Array(6).fill({ c: 2, r: 2 }),
      stats: Array(4).fill({ c: 2, r: 2 }),
    },
    telecom: {
      titles: {
        telecom: { c: 0, r: 0, cs: 3, rs: 2 },
        software: { c: 4, r: 0, cs: 1, rs: 4 },
        system: { c: 0, r: 4, cs: 3, rs: 1 },
        manpower: { c: 3, r: 4, cs: 2, rs: 1 },
      },
      icons: [
        { c: 0, r: 2 },
        { c: 1, r: 2 },
        { c: 2, r: 2 },
        { c: 0, r: 3 },
        { c: 1, r: 3 },
        { c: 2, r: 3 },
      ],
      stats: [
        { c: 3, r: 0 },
        { c: 3, r: 1 },
        { c: 3, r: 2 },
        { c: 3, r: 3 },
      ],
    },
    manpower: {
      titles: {
        telecom: { c: 0, r: 0, cs: 3, rs: 1 },
        software: { c: 3, r: 0, cs: 2, rs: 1 },
        system: { c: 0, r: 1, cs: 1, rs: 4 },
        manpower: { c: 1, r: 1, cs: 3, rs: 2 },
      },
      icons: [
        { c: 1, r: 3 },
        { c: 2, r: 3 },
        { c: 3, r: 3 },
        { c: 1, r: 4 },
        { c: 2, r: 4 },
        { c: 3, r: 4 },
      ],
      stats: [
        { c: 4, r: 1 },
        { c: 4, r: 2 },
        { c: 4, r: 3 },
        { c: 4, r: 4 },
      ],
    },
    software: {
      titles: {
        telecom: { c: 0, r: 0, cs: 1, rs: 4 },
        software: { c: 1, r: 0, cs: 3, rs: 2 },
        system: { c: 0, r: 4, cs: 3, rs: 1 },
        manpower: { c: 3, r: 4, cs: 2, rs: 1 },
      },
      icons: [
        { c: 1, r: 2 },
        { c: 2, r: 2 },
        { c: 3, r: 2 },
        { c: 1, r: 3 },
        { c: 2, r: 3 },
        { c: 3, r: 3 },
      ],
      stats: [
        { c: 4, r: 0 },
        { c: 4, r: 1 },
        { c: 4, r: 2 },
        { c: 4, r: 3 },
      ],
    },
    system: {
      titles: {
        telecom: { c: 0, r: 0, cs: 3, rs: 1 },
        software: { c: 3, r: 0, cs: 2, rs: 1 },
        system: { c: 0, r: 1, cs: 3, rs: 2 },
        manpower: { c: 4, r: 1, cs: 1, rs: 4 },
      },
      icons: [
        { c: 0, r: 3 },
        { c: 1, r: 3 },
        { c: 2, r: 3 },
        { c: 0, r: 4 },
        { c: 1, r: 4 },
        { c: 2, r: 4 },
      ],
      stats: [
        { c: 3, r: 1 },
        { c: 3, r: 2 },
        { c: 3, r: 3 },
        { c: 3, r: 4 },
      ],
    },
  };

  const mobileOrder = {
    telecom: 'order-1',
    icons: 'order-2',
    stats: 'order-3',
    software: 'order-4',
    system: 'order-5',
    manpower: 'order-6',
  };

  function getStyle(c, r, cs = 1, rs = 1) {
    return `--md-top: ${r * 20}%; --md-left: ${c * 20}%; --md-w: ${cs * 20}%; --md-h: ${rs * 20}%; --md-z: ${30 - c * 5 - r};`;
  }

  function getBorders(c, r, cs = 1, rs = 1, type = 'title', idx = 0) {
    let classes = 'border-base-content/30 border-solid ';

    // Mobile borders
    if (type === 'icon') {
      if (idx % 3 !== 2) classes += 'border-r-2 ';
      if (idx < 3) classes += 'border-b-2 ';
    } else if (type === 'stat') {
      if (idx < 3) classes += 'border-b-2 ';
    } else {
      classes += 'border-b-2 ';
    }

    // Desktop borders
    if (c + cs < 5) classes += 'md:border-r-2 ';
    else classes += 'md:border-r-0 ';

    if (r + rs < 5) classes += 'md:border-b-2 ';
    else classes += 'md:border-b-0 ';

    return classes;
  }

  $effect(() => {
    if (!gridRef) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active === 'collapsed') active = 'telecom';
      },
      { threshold: 0.9 },
    );
    observer.observe(gridRef);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={gridRef}
  class="relative w-full flex flex-col md:block md:aspect-square overflow-hidden bg-base-100 lg:w-[60%]"
>
  <!-- Radial Greenish Blur Background -->
  <div class="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
    <div class="w-full h-full md:w-[80%] md:h-[80%] rounded-full bg-primary/20 blur-[80px]"></div>
  </div>
  {#each services as service}
    {@const pos = stateLayouts[active].titles[service.id]}
    <button
      class="grid-block flex cursor-pointer transition-all duration-700 ease-in-out hover:bg-base-100/90 hover:shadow-lg bg-base-100/70 backdrop-blur-md p-6 md:p-8 {mobileOrder[
        service.id
      ]} {getBorders(pos.c, pos.r, pos.cs, pos.rs, 'title', 0)} {active === service.id
        ? 'flex-row items-center justify-between text-left'
        : 'flex-col items-center justify-center text-center'}"
      style={getStyle(pos.c, pos.r, pos.cs, pos.rs)}
      onmouseenter={() => (active = service.id)}
      onfocus={() => (active = service.id)}
    >
      <h3
        class="font-bold text-base-content/80 transition-all duration-700 {active ===
        service.id
          ? 'text-2xl md:text-3xl mt-0'
          : active === 'collapsed'
            ? 'text-2xl md:text-4xl mt-0'
            : 'text-xl mt-8 md:mt-4'}"
      >
        {@html service.titleHtml}
      </h3>

      <div
        class="{active === service.id
          ? 'relative shrink-0'
          : 'absolute top-4 right-4'} flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary/10 text-primary transition-transform duration-700 {active ===
        service.id
          ? '-rotate-45'
          : 'rotate-0'}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </button>
  {/each}

  <!-- Icons Drawer -->
  <div class="relative w-full h-[250px] md:h-auto md:contents {mobileOrder.icons}">
    {#each services as service}
      <div
        class="absolute inset-0 grid grid-cols-3 grid-rows-2 md:static md:contents transition-opacity duration-700 {active ===
        service.id
          ? 'opacity-100 z-10 pointer-events-auto'
          : 'opacity-0 z-0 pointer-events-none md:opacity-100'}"
      >
        {#each service.icons as icon, idx}
          {@const pos = stateLayouts[active].icons[idx]}
          <div
            class="grid-block flex flex-col items-center justify-center p-4 text-center bg-base-100/70 backdrop-blur-md md:transition-all md:duration-700 ease-in-out {getBorders(
              pos.c,
              pos.r,
              1,
              1,
              'icon',
              idx,
            )} {active === service.id
              ? 'md:opacity-100 md:pointer-events-auto'
              : 'md:opacity-0 md:pointer-events-none'}"
            style={getStyle(pos.c, pos.r)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="mb-2 h-8 w-8 text-primary"
            >
              {@html icon.svg}
            </svg>
            <span class="text-xs font-medium text-base-content/70"
              >{@html icon.label}</span
            >
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <!-- Stats Box -->
  <div class="relative w-full h-[390px] md:h-auto md:contents {mobileOrder.stats}">
    {#each services as service}
      <div
        class="absolute inset-0 flex flex-col md:contents transition-opacity duration-700 {active ===
        service.id
          ? 'opacity-100 z-10 pointer-events-auto'
          : 'opacity-0 z-0 pointer-events-none md:opacity-100'}"
      >
        {#each service.stats as stat, idx}
          {@const pos = stateLayouts[active].stats[idx]}
          <div
            class="grid-block flex flex-1 flex-col items-center justify-center space-y-1 p-4 text-center bg-base-100/70 backdrop-blur-md md:transition-all md:duration-700 ease-in-out {getBorders(
              pos.c,
              pos.r,
              pos.cs || 1,
              pos.rs || 1,
              'stat',
              idx,
            )} {active === service.id
              ? 'md:opacity-100 md:pointer-events-auto'
              : 'md:opacity-0 md:pointer-events-none'}"
            style={getStyle(pos.c, pos.r, pos.cs || 1, pos.rs || 1)}
          >
            <span class="text-2xl font-bold text-primary">{stat.val}</span>
            <span class="text-xs font-medium text-base-content/70"
              >{@html stat.label}</span
            >
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .grid-block {
    position: relative;
    width: 100%;
    height: auto;
  }
  @media (min-width: 768px) {
    .grid-block {
      position: absolute !important;
      top: var(--md-top);
      left: var(--md-left);
      width: var(--md-w);
      height: var(--md-h);
      z-index: var(--md-z, 10);
    }
    button.grid-block:hover {
      z-index: 40 !important;
    }
  }
</style>
