document.addEventListener('DOMContentLoaded', () => {
  const board = document.querySelector('.ecosystem-board');
  if (!board) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'ecosystem-lines');
  svg.style.position = 'absolute';
  svg.style.inset = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '0';
  board.appendChild(svg);

  const connections = [
    { from: 'node-me', to: 'node-ai', color: 'var(--node-person)' },
    { from: 'node-ai', to: 'node-auto', color: 'var(--node-engine-border)' },
    { from: 'node-ai', to: 'node-lang', color: 'var(--node-engine-border)' },

    { from: 'node-lang', to: 'node-shuka-web', color: 'var(--node-engine-border)' },
    { from: 'node-lang', to: 'node-music', color: 'var(--node-engine-border)' },
    { from: 'node-lang', to: 'node-manga', color: 'var(--node-engine-border)', dash: true, opacity: 0.5 },
    { from: 'node-lang', to: 'node-blog', color: 'var(--node-engine-border)' },

    { from: 'node-shuka-web', to: 'node-music', color: 'var(--node-website)' },
    { from: 'node-shuka-web', to: 'node-manga', color: 'var(--node-website)', dash: true, opacity: 0.6 },
    { from: 'node-music', to: 'node-manga', color: 'var(--node-content)', dash: true, opacity: 0.6 },

    { from: 'node-music', to: 'node-sns-visual', color: 'var(--node-content)' },
    { from: 'node-manga', to: 'node-sns-visual', color: 'var(--node-future)', dash: true, opacity: 0.45 },
    { from: 'node-manga', to: 'node-sns-comm', color: 'var(--node-future)', dash: true, opacity: 0.45 },
    { from: 'node-blog', to: 'node-sns-comm', color: 'var(--node-content)' },
    { from: 'node-travel', to: 'node-sns-visual', color: 'var(--node-content)' },

    { from: 'node-sns-visual', to: 'node-global', color: 'var(--node-sns)' },
    { from: 'node-sns-comm', to: 'node-global', color: 'var(--node-sns)' },

    { from: 'node-global', to: 'node-shuka-web', color: 'var(--node-global)' },
    { from: 'node-global', to: 'node-note', color: 'var(--node-global)' },

    { from: 'node-shuka-web', to: 'node-revenue', color: 'var(--node-money)' },
    { from: 'node-travel', to: 'node-revenue', color: 'var(--node-money)' },
    { from: 'node-note', to: 'node-revenue', color: 'var(--node-money)' }
  ];

  const resolveColor = (value) => {
    if (!value) return '#ccc';
    if (value.startsWith('var(')) {
      const varName = value.slice(4, -1).trim();
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#ccc';
    }
    return value;
  };

  let rafId;

  function drawLines() {
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    const boardRect = board.getBoundingClientRect();
    const offsetX = boardRect.left + window.scrollX;
    const offsetY = boardRect.top + window.scrollY;
    const boardHeight = board.scrollHeight;
    svg.setAttribute('width', boardRect.width);
    svg.setAttribute('height', boardHeight);
    svg.style.height = `${boardHeight}px`;

    connections.forEach((conn, index) => {
      const fromEl = document.getElementById(conn.from);
      const toEl = document.getElementById(conn.to);
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2 + window.scrollX - offsetX;
      const startY = fromRect.top + fromRect.height / 2 + window.scrollY - offsetY;
      const endX = toRect.left + toRect.width / 2 + window.scrollX - offsetX;
      const endY = toRect.top + toRect.height / 2 + window.scrollY - offsetY;

      const controlX = startX + (endX - startX) * 0.5;
      const d = `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`;

      const strokeColor = resolveColor(conn.color);
      const markerId = `arrow-${index}`;
      const marker = document.createElementNS(svgNS, 'marker');
      marker.setAttribute('id', markerId);
      marker.setAttribute('markerWidth', '10');
      marker.setAttribute('markerHeight', '10');
      marker.setAttribute('refX', '10');
      marker.setAttribute('refY', '5');
      marker.setAttribute('orient', 'auto');
      const markerPath = document.createElementNS(svgNS, 'path');
      markerPath.setAttribute('d', 'M0,0 L10,5 L0,10 Z');
      markerPath.setAttribute('fill', strokeColor);
      marker.appendChild(markerPath);
      defs.appendChild(marker);

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', strokeColor);
      path.setAttribute('stroke-width', conn.width || 3);
      path.setAttribute('stroke-opacity', conn.opacity || 0.65);
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('marker-end', `url(#${markerId})`);

      if (conn.dash) {
        path.setAttribute('stroke-dasharray', '8 8');
      }

      svg.appendChild(path);
    });
  }

  setTimeout(drawLines, 300);
  window.addEventListener('resize', drawLines);
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(drawLines);
  });
});
