// Sidebar / tab-bar items shared by every screen.
// [id, label, href, svg path, badge]
export const NAV_ITEMS = [
  ['home','Home','#/','M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',''],
  ['discover','Discover','#/discover','M12 3a9 9 0 100 18 9 9 0 000-18zm4 5l-2 6-6 2 2-6z',''],
  ['feed','Feed','#/feed','M4 5h16M4 12h16M4 19h10','26'],
  ['community','Community','#/community','M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z','12'],
  ['leaders','Leaderboard','#/leaderboard','M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM5 5H3v2a3 3 0 003 3M19 5h2v2a3 3 0 01-3 3',''],
  ['studio','AI Studio','#/studio','M12 3l1.8 4.9L19 9.7l-4.2 3.2 1.4 5.1L12 15.2 7.8 18l1.4-5.1L5 9.7l5.2-1.8z','NEW'],
  ['creator','Creator hub','#/creator','M4 20V10M10 20V4M16 20v-7M22 20H2','']
];

export function navigation(active) {
  return {
    links: NAV_ITEMS.map(([id, label, href, d, badge]) => ({
      id,
      label,
      href,
      d,
      badge,
      hasBadge: !!badge,
      current: id === active ? 'page' : 'false',
      style: id === active ? 'background:#14121F;color:#fff' : 'background:transparent;color:#14121F',
      badgeStyle: badge === 'NEW' ? 'background:#FFC93C;color:#2A2000' : 'background:#FF6B4A;color:#14121F',
    })),
  };
}
