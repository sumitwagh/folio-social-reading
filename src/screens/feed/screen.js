import { ViewModel } from '../../runtime.js';

// Feed screen: state, data and every interaction on this page.
export default class FeedScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const RX = ['Love', 'Mind-blown', 'Same', 'Need this'];
    const mine = s.rx || {}, com = s.com || {}, H = s.hide || {}, F = s.fol || {};
    const poll = s.poll;
    const base = [
      { id:1, k:'Stories', kind:'STORY', kindBg:'#E3FBF4', kindInk:'#0B6B53', name:'Dev Raman', initials:'DR', color:'#1FC8A0', ink:'#05332A', action:'posted a story', meta:'#SaltDiaries · Day 42 · 18 min', isStory:true, cardBg:'#1FC8A0', cardInk:'#05332A', text:'The keeper tried to switch the radio off. It said, very politely, that it had a few more names to read.', book:'Salt & Static', n:[1840,620,210,95], comments:[['Priya','Okay but WHOSE names?'],['Kabir','Chapter 4 is going to wreck me.']] },
      { id:2, k:'Following', kind:'REVIEW ★★★★★', kindBg:'#FFF4CF', kindInk:'#5C4300', name:'Kabir Sethi', initials:'KS', color:'#FFC93C', ink:'#2A2000', action:'reviewed The Weight of Light', meta:'1 hour ago', isText:true, hasCover:true, cover:'#FF7AC6', text:'The darkroom chapter is the most beautiful thing I’ve read this year. Slow, exact, unbearable. Bring tissues.', n:[322,41,88,12], comments:[['Leila','Adding it to my buddy-read list.']] },
      { id:3, k:'For you', kind:'POLL', kindBg:'#EEECFF', kindInk:'#3B2DC9', name:'Chorus Community', initials:'FC', color:'#5B4BFF', ink:'#fff', action:'asked everyone', meta:'2,140 votes · ends tonight', isPoll:true, text:'Is Ada alive in The Cartographer of Silence?', n:[410,190,520,20], comments:[['Atlas','I will die on the “mapped” hill.']] },
      { id:4, k:'For you', kind:'AI PICK', kindBg:'#EEECFF', kindInk:'#3B2DC9', name:'Your companion', initials:'✦', color:'#EEECFF', ink:'#3B2DC9', action:'made you a shelf', meta:'Based on your last 30 days', isAi:true, text:'You keep saving books set beside the sea. I built a “Salt-air mysteries” shelf of four — two are by authors you already follow.', n:[0,0,0,0], comments:[] },
      { id:5, k:'Following', kind:'MILESTONE', kindBg:'#FFE8E2', kindInk:'#9A2E16', name:'Tomás Ruiz', initials:'TR', color:'#FF6B4A', ink:'#14121F', action:'unlocked a badge', meta:'#12BooksAway · 2 hours ago', isMilestone:true, text:'Border Hopper unlocked!', sub:'5 books set in 5 countries in one month', n:[612,40,95,8], comments:[['Aanya','Teach me your ways.']] },
      { id:6, k:'Following', kind:'PROGRESS', kindBg:'#E3FBF4', kindInk:'#0B6B53', name:'Leila Haddad', initials:'LH', color:'#1FC8A0', ink:'#05332A', action:'is reading Salt & Static', meta:'Buddy read with 4 friends · 3 hours ago', isText:true, hasCover:true, cover:'#14121F', text:'Chapter 9 and I’ve stopped trusting the lighthouse. Who’s with me?', hasProg:true, prog:58, progNote:'chapter 9 of 18', n:[188,22,64,9], comments:[['Nora','Never trust a lighthouse.']] }
    ];
    const tab = s.tab || 'For you';
    const extra = s.mine || [];
    const SUG = 'Chapter 9 of Cartographer just rearranged my brain. Come argue with me in the ch. 9 room tonight.';
    const dr = s.draft || '';
    const ghost = dr && SUG.toLowerCase().indexOf(dr.toLowerCase()) === 0 && dr.length < SUG.length ? SUG.slice(dr.length) : (!dr && s.ai ? SUG : '');
    const all = extra.concat(base);
    const shown = all.filter((p) => !H[p.id] && (tab === 'For you' || p.k === tab || (tab === 'Following' && p.k === 'Stories') || p.mine));
    const PO = [['Alive, just erased', 46], ['Gone before chapter one', 38], ['Both, somehow', 16]];
    const on = 'background:#14121F;color:#fff;border:1px solid #14121F', off = 'background:#fff;color:#14121F;border:1px solid #E7E5EE';
    return {
      rings: [['Dev','DR','#1FC8A0','#05332A'],['Mira','MO','#14121F','#FFC93C'],['Sana','SK','#FFC93C','#2A2000'],['Hana','HI','#FF7AC6','#3A0C2A'],['Theo','TB','#5B4BFF','#fff'],['Lena','LV','#FF6B4A','#2A0A02']].map(([n, a, c, i]) => ({ n, a, c, i })),
      draft: s.draft || '', onDraft: (e) => this.setState({ draft: e.target.value }),
      aiHelp: () => this.setState({ ai: true }),
      ghost, hasGhost: !!ghost, noGhost: !ghost, ph: s.ai ? '' : 'What are you reading, Aanya?',
      ghostHint: ghost ? 'Suggestion available: ' + SUG + '. Press Tab to accept.' : '',
      accept: () => this.setState({ draft: SUG, ai: false }),
      onKey: (e) => { if (ghost && (e.key === 'Tab' || (e.key === 'ArrowRight' && e.target.selectionStart === (s.draft || '').length))) { e.preventDefault(); this.setState({ draft: SUG, ai: false }); } },
      post: () => { const t = (s.draft || '').trim(); if (!t) return; this.setState({ draft: '', mine: [{ id: 'm' + extra.length, mine: true, k:'Following', kind:'JUST NOW', kindBg:'#EEECFF', kindInk:'#3B2DC9', name:'Aanya Rao', initials:'AR', color:'#8E83FF', ink:'#fff', action:'shared a thought', meta:'Just now · +20 XP', isText:true, text:t, n:[0,0,0,0], comments:[] }].concat(extra) }); },
      tabs: ['For you', 'Following', 'Stories'].map((t) => ({ label: t, pick: () => this.setState({ tab: t }), style: t === tab ? on : off })),
      posts: shown.map((p, j) => ({ ...p, d: (j * .06) + 's', isStory: !!p.isStory, isText: !!p.isText, isPoll: !!p.isPoll, isMilestone: !!p.isMilestone, isAi: !!p.isAi, hasCover: !!p.hasCover, hasProg: !!p.hasProg, cover: p.cover || '#14121F', cardBg: p.cardBg || '#fff', cardInk: p.cardInk || '#14121F', book: p.book || '', sub: p.sub || '', prog: p.prog || 0, progNote: p.progNote || '',
        reacts: p.isAi ? [] : RX.map((r, k) => ({ label: r, n: p.n[k] + (mine[p.id] === r ? 1 : 0), pick: () => this.setState({ rx: { ...mine, [p.id]: mine[p.id] === r ? null : r } }), style: mine[p.id] === r ? 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF' : 'background:#F7F6FB;color:#14121F;border:1px solid #F0EEF5' })),
        comOpen: !!com[p.id], toggleCom: () => this.setState({ com: { ...com, [p.id]: !com[p.id] } }), comLabel: p.comments.length ? (com[p.id] ? 'Hide comments' : p.comments.length + ' comments') : '',
        comments: p.comments.map(([n, t]) => ({ n, t })),
        hide: () => this.setState({ hide: { ...H, [p.id]: true } }),
        opts: PO.map(([label, pct], k) => ({ label, pct: poll == null ? '' : (pct + (poll === k ? 1 : 0)) + '%', w: poll == null ? 0 : pct, fill: poll === k ? '#CFC9FF' : '#F0EEF5', border: poll === k ? 'background:#fff;border:2px solid #5B4BFF' : 'background:#fff;border:1px solid #E7E5EE', pick: () => this.setState({ poll: k }) })),
        votesLabel: poll == null ? 'Vote to see results' : (2141).toLocaleString() + ' votes · you voted'
      })),
      week: ['M','T','W','T','F','S','S'].map((l, k) => ({ l, s: k < 6 ? 'background:#FF6B4A;opacity:' + (0.4 + k * .1) : 'border:2px dashed #FF6B4A' })),
      people: [['Leila Haddad','LH','#1FC8A0','61 books this year'],['Priya Nair','PN','#FFC93C','Loves debuts'],['Wei Chen','WC','#8E83FF','Sci-fi speed reader']].map(([n, i, c, w]) => ({ n, i, c, w, pick: () => this.setState({ fol: { ...F, [n]: !F[n] } }), label: F[n] ? 'Following' : 'Follow', style: F[n] ? off : on }))
    };
  }
}
