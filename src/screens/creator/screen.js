import { ViewModel } from '../../runtime.js';

// Creator hub screen: state, data and every interaction on this page.
export default class CreatorScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const R = {
      '7 days': { k:['42.8k','18%','1,214','9%','1,840','32%','94','+6'], b:[[120,60],[140,70],[160,80],[260,110],[420,140],[300,120],[330,130]], l:['Thu','Fri','Sat','Sun','Mon','Tue','Wed'] },
      '30 days': { k:['164k','24%','4,980','15%','6,210','21%','94','+9'], b:[[620,300],[700,320],[880,380],[1120,460],[980,420],[1240,500],[1400,560]], l:['W1','W2','W3','W4','W5','W6','Now'] },
      '90 days': { k:['421k','37%','11.2k','28%','15.4k','40%','94','+14'], b:[[1800,900],[2100,1000],[2600,1200],[3000,1400],[3300,1500],[3900,1700],[4400,1900]], l:['Aug','Sep','Oct','Oct','Nov','Nov','Now'] }
    };
    const rng = s.rng || '7 days';
    const d = R[rng];
    const max = Math.max(...d.b.map(([a, b]) => a + b));
    const sp = (arr) => arr.map((v, i) => (i * 160 / (arr.length - 1)).toFixed(0) + ',' + (36 - v * 32).toFixed(1)).join(' ');
    const S = [[.2,.3,.25,.5,.9,.7,.8],[.3,.35,.4,.5,.6,.75,.9],[.4,.5,.45,.7,.8,.85,1],[.6,.62,.7,.72,.8,.9,.95]];
    return {
      ranges: Object.keys(R).map((r) => ({ label: r, pick: () => this.setState({ rng: r, f: !s.f }), style: r === rng ? 'background:#14121F;color:#fff' : 'background:transparent;color:#14121F' })),
      kpis: [
        { label:'Reads', value:d.k[0], delta:d.k[1], bg:'#5B4BFF', ink:'#fff', spark:sp(S[0]) },
        { label:'New followers', value:d.k[2], delta:d.k[3], bg:'#FFC93C', ink:'#2A2000', spark:sp(S[1]) },
        { label:'Comments & replies', value:d.k[4], delta:d.k[5], bg:'#1FC8A0', ink:'#05332A', spark:sp(S[2]) },
        { label:'Influence score', value:d.k[6], delta:d.k[7], bg:'#14121F', ink:'#fff', spark:sp(S[3]) }
      ].map((k, j) => ({ ...k, an: s.f ? 'roll2' : 'roll', sa: s.f ? 'drawsp2' : 'drawsp', d: (j * 0.07) + 's' })),
      bars: d.b.map(([a, b], i) => ({ h1: Math.round(a / max * 170), h2: Math.round(b / max * 170), total: (a + b).toLocaleString(), l: d.l[i], d: (i * .05) + 's' })),
      chartLabel: 'Stacked bar chart of new followers over ' + rng + ', mostly from stories',
      top: [['#398','The Bureau’s lunch break','5.1k likes · 612 replies','#1FC8A0','#05332A'],['#411','The census that missed a street','3.4k likes · became ch. 3','#5B4BFF','#fff'],['#407','Forty-one seconds of nothing','2.2k likes · 140 replies','#FF7AC6','#3A0C2A'],['#412','The lamplighter counts in threes','1.2k likes · today','#FFC93C','#2A2000']].map(([n, title, meta, bg, ink]) => ({ n, title, meta, bg, ink })),
      ideas: [
        { type:'ESSAY', signal:'412 replies', title:'“Why I wrote Ada like that”', why:'The narrator thread is your biggest conversation ever.', bg:'#FFC93C', ink:'#2A2000' },
        { type:'TUTORIAL', signal:'96 asks', title:'How a daily story becomes a chapter', why:'Writers keep asking about your process in every Q&A.', bg:'#1FC8A0', ink:'#05332A' },
        { type:'SHORT STORY', signal:'5.1k likes', title:'Lunch at the Bureau of Sound', why:'Readers want the full story behind field log #398.', bg:'#FF7AC6', ink:'#3A0C2A' }
      ],
      adding: !!s.adding, addExp: s.adding ? 'true' : 'false', addLabel: s.adding ? 'Cancel' : '+ Add book',
      toggleAdd: () => this.setState({ adding: !s.adding, addError: '' }),
      newTitle: s.newTitle || '', onNewTitle: (e) => this.setState({ newTitle: e.target.value }), addError: s.addError || '',
      addBook: () => { const t = (s.newTitle || '').trim(); if (t.length < 2) { this.setState({ addError: 'Add a working title first.' }); return; } this.setState({ drafts: [t].concat(s.drafts || []), newTitle: '', adding: false, addError: '' }); },
      books: (s.drafts || []).map((t) => ({ title: t, bg: '#FF7AC6', statusLabel: 'DRAFT', status: 'background:#FFE7F5;color:#8A1A5C', meta: 'Started just now · open AI Studio to seed it', href: '#/studio' })).concat([
        { title:'The Cartographer of Silence', bg:'#14121F', statusLabel:'PUBLISHED', status:'background:#E3FBF4;color:#0B6B53', meta:'121k reads · ★ 4.8 · 412 threads', href:'#/book' },
        { title:'The Lantern Census', bg:'#5B4BFF', statusLabel:'PRE-ORDER · MAR 2027', status:'background:#FFF4CF;color:#5C4300', meta:'5.2k waitlist · 3 sneak peeks', href:'#/studio' },
        { title:'Low Tide Atlas', bg:'#1FC8A0', statusLabel:'BACKLIST', status:'background:#EEECFF;color:#3B2DC9', meta:'37.8k reads · ★ 4.5', href:'#/book' }
      ])
    };
  }
}
