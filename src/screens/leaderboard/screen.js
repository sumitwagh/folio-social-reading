import { ViewModel } from '../../runtime.js';

// Leaderboard screen: state, data and every interaction on this page.
export default class LeaderboardScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const cat = s.cat || 'Readers', per = s.per || 'This week';
    const D = {
      'Authors': { href:'#/author', unit:'', rows:[['Mira Okafor','MO','#FFC93C','#2A2000',94],['Dev Raman','DR','#1FC8A0','#05332A',91],['Hana Ishida','HI','#FF7AC6','#3A0C2A',88],['Sana Kulkarni','SK','#FFC93C','#2A2000',85],['Theo Brandt','TB','#5B4BFF','#fff',82],['Lena Varga','LV','#FF6B4A','#14121F',80],['Arjun Mehta','AM','#8E83FF','#fff',77],['Iris Calloway','IC','#1FC8A0','#05332A',74],['Ravi Menon','RM','#FF7AC6','#3A0C2A',71],['Ada Fernandes','AF','#14121F','#fff',69]], mv:['+2','+1','−1','+7','0','+3','−2','+1','+4','0'] },
      'Readers': { href:'#/feed', unit:' XP', rows:[['Leila Haddad','LH','#1FC8A0','#05332A',4210],['Kabir Sethi','KS','#FF7AC6','#3A0C2A',3880],['Tomás Ruiz','TR','#FF6B4A','#14121F',3120],['Nora Lindqvist','NL','#8E83FF','#fff',2900],['Priya Nair','PN','#FFC93C','#2A2000',2640],['Aanya Rao (you)','AR','#5B4BFF','#fff',2340],['Wei Chen','WC','#1FC8A0','#05332A',2210],['Omar Farouk','OF','#FF7AC6','#3A0C2A',2040],['Mei Tanaka','MT','#FFC93C','#2A2000',1980],['Sam Okoye','SO','#14121F','#fff',1760]], mv:['+1','0','+4','−1','+2','+41','−3','0','+2','+1'] },
      'Reviewers': { href:'#/book', unit:' votes', rows:[['Leila Haddad','LH','#1FC8A0','#05332A',8400],['Atlas Reads','AT','#FFC93C','#2A2000',6900],['Kabir Sethi','KS','#FF7AC6','#3A0C2A',5200],['Nora Lindqvist','NL','#8E83FF','#fff',4100],['Priya Nair','PN','#FFC93C','#2A2000',3800],['Wei Chen','WC','#1FC8A0','#05332A',3100],['Omar Farouk','OF','#FF7AC6','#3A0C2A',2700],['Tomás Ruiz','TR','#FF6B4A','#14121F',2200],['Mei Tanaka','MT','#FFC93C','#2A2000',1900],['Sam Okoye','SO','#14121F','#fff',1600]], mv:['+1','+2','0','−2','+5','0','+1','+3','+2','0'] },
      'Contributors': { href:'#/community', unit:' sparks', rows:[['Atlas Reads','AT','#FFC93C','#2A2000',42],['Priya Nair','PN','#FF6B4A','#14121F',38],['Leila Haddad','LH','#1FC8A0','#05332A',33],['Kabir Sethi','KS','#FF7AC6','#3A0C2A',29],['Tomás Ruiz','TR','#8E83FF','#fff',24],['Nora Lindqvist','NL','#FFC93C','#2A2000',21],['Omar Farouk','OF','#1FC8A0','#05332A',18],['Wei Chen','WC','#FF7AC6','#3A0C2A',15],['Mei Tanaka','MT','#5B4BFF','#fff',13],['Sam Okoye','SO','#14121F','#fff',11]], mv:['+6','+3','0','+1','+2','−1','0','+1','+2','0'] }
    };
    const d = D[cat];
    const rows = per === 'This week' ? d.rows : [d.rows[1], d.rows[0], ...d.rows.slice(2)];
    const max = rows[0][4];
    const fmt = (v) => typeof v === 'number' && v >= 1000 ? v.toLocaleString() : String(v);
    const Q = s.q || { a: true };
    const QS = [['a','Read 30 minutes, 5 days in a row',60],['b','Reply to an author story',40],['c','Write one review',80],['d','Join a live room',20]];
    const bonus = QS.reduce((a, [id, , xp]) => a + (Q[id] && id !== 'a' ? xp : 0), 0);
    const xp = 2340 + bonus;
    const J = s.j || { x: true };
    const POD = [[1, 150, 72, '#C9C6D8', '#14121F', '-.1s'], [0, 210, 88, '#FFC93C', '#2A2000', '0s'], [2, 110, 72, '#FF9B7F', '#2A0A02', '-.2s']];
    return {
      myRank: Math.max(318 - Math.round(bonus / 4), 1),
      levelUp: xp >= 2450,
      xp: xp.toLocaleString(), xpPct: Math.min(100, Math.round(xp / 2450 * 100)),
      xpNote: xp >= 2450 ? 'Level 8 unlocked! New badge waiting.' : (2450 - xp) + ' XP to go — finish your quests to level up.',
      cats: Object.keys(D).map((c) => ({ label: c, pick: () => this.setState({ cat: c }), style: c === cat ? 'background:#14121F;color:#fff;border:1px solid #14121F' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE' })),
      periods: ['This week', 'This month'].map((p) => ({ label: p, pick: () => this.setState({ per: p }), style: p === per ? 'background:#14121F;color:#fff' : 'background:transparent;color:#14121F' })),
      podium: POD.map(([i, h, av, bar, barInk, dl]) => ({ rank: i + 1, h, av, bar, barInk, d: dl, crown: i === 0, name: rows[i][0], initials: rows[i][1], color: rows[i][2], ink: rows[i][3], score: fmt(rows[i][4]) + d.unit, href: d.href })),
      rows: rows.slice(3).map((r, k) => { const mv = d.mv[k + 3]; return { rank: k + 4, name: r[0], initials: r[1], color: r[2], ink: r[3], score: fmt(r[4]), pct: Math.round(r[4] / max * 100), d: (k * .06) + 's', href: d.href, move: mv === '0' ? '—' : (mv[0] === '+' ? '↑ ' : '↓ ') + mv.slice(1), moveStyle: mv[0] === '+' ? 'background:#E3FBF4;color:#0B6B53' : mv === '0' ? 'background:#F0EEF5;color:#5E5B70' : 'background:#FFE8E2;color:#9A2E16', style: r[0].indexOf('(you)') > -1 ? 'background:#EEECFF;box-shadow:inset 0 0 0 2px #5B4BFF' : '' }; }),
      quests: QS.map(([id, label, xp2]) => ({ label, xp: xp2, on: Q[id] ? 'true' : 'false', pick: () => this.setState({ q: { ...Q, [id]: !Q[id] } }), style: Q[id] ? 'background:#E3FBF4;border:1px solid #B5EFDD' : 'background:#F7F6FB;border:1px solid #F0EEF5', box: Q[id] ? 'background:#1FC8A0;color:#05332A' : 'border:2px solid #D3D0DE', check: Q[id] ? '✓' : '', text: Q[id] ? 'text-decoration:line-through;color:#5E5B70' : '' })),
      questDone: QS.filter(([id]) => Q[id]).length,
      badges: [['Night Owl','M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z','#8E83FF','#fff',1,-4],['First Review','M12 3l2.6 5.4 5.9.9-4.3 4.1 1 5.9L12 16.6 6.8 19.3l1-5.9L3.5 9.3l5.9-.9z','#FFC93C','#2A2000',1,3],['23-Day Streak','M12 2c1 4 5 6 5 11a5 5 0 01-10 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-5 0-9z','#FF6B4A','#14121F',1,-2],['Trendsetter','M3 17l6-6 4 4 8-8M15 7h6v6','#1FC8A0','#05332A',1,4],['Q&A Regular','M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z','#F0EEF5','#5E5B70',0,-3],['Century Club','M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v5l3 3','#F0EEF5','#5E5B70',0,2]].map(([label, dd, bg, ink, got, r]) => ({ label, d: dd, r, state: got ? 'EARNED' : '62% THERE', style: 'background:' + bg + ';color:' + ink + (got ? '' : ';border:2px dashed #D3D0DE') })),
      challenges: [['x','#12BooksAway','Week 3 · 4 of 12 read · 3,402 in'],['y','Author → Book December','Follow one author’s stories for 30 days'],['z','Poetry weekend sprint','Finish a collection by Sunday']].map(([id, title, meta]) => ({ title, meta, pick: () => this.setState({ j: { ...J, [id]: !J[id] } }), label: J[id] ? 'Joined' : 'Join', style: J[id] ? 'background:#14121F;color:#fff;border:0' : 'background:#fff;color:#14121F;border:0' }))
    };
  }
}
