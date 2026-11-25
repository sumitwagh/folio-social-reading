import { ViewModel } from '../../runtime.js';

// Community screen: state, data and every interaction on this page.
export default class CommunityScreen extends ViewModel {
  destroy() { if (this._t) clearTimeout(this._t); }
  bindings() {
    const s = this.state;
    const SP = [
      { id:'carto', name:'Cartographer of Silence', icon:'CS', bg:'#14121F', ink:'#FFC93C', unread:12 },
      { id:'salt', name:'Salt & Static', icon:'SS', bg:'#1FC8A0', ink:'#05332A', unread:5 },
      { id:'ch', name:'#12BooksAway', icon:'12', bg:'#FF6B4A', ink:'#14121F', unread:0 },
      { id:'craft', name:'Writers’ craft corner', icon:'WC', bg:'#8E83FF', ink:'#fff', unread:3 }
    ];
    const TH = {
      carto:[
        { id:'n', tag:'THEORY', tagColor:'#9A2E16', title:'Is the narrator already gone? (spoilers ch. 1–12)', author:'Atlas Reads', initials:'AT', color:'#FFC93C', when:'2h', votes:1240, typing:12, count:412, body:'Every time Ada enters the unnamed street, nobody speaks to her — only about her. Chapter 12 lists her as “mapped”, the word the Bureau uses for the dead. Too much, or has Okafor been telling us all along?', digest:'60% think Ada is alive but erased; 40% think she died before chapter 1. Most-cited evidence: the ledger on p. 211. Mira liked 4 replies but confirmed nothing.', idea:'412 replies on one passage — perfect for a behind-the-scenes essay.',
          replies:[['Kabir Sethi','KS','#FF7AC6','STREAK 61','background:#FFE7F5;color:#8A1A5C','1h','On p. 240 the baker hands her change. Ghosts don’t get change!!','318',''],['Mira Okafor','MO','#FFC93C','AUTHOR','background:#14121F;color:#FFC93C','48m','Re-read the dedication after chapter 12. That’s all I’m saying.','1.9k','margin-left:24px;padding-left:16px;border-left:3px solid #FFC93C'],['Leila Haddad','LH','#1FC8A0','TOP REVIEWER','background:#E3FBF4;color:#0B6B53','20m','“For the ones who listen.” Not read. LISTEN. I’m convinced.','644','margin-left:24px;padding-left:16px;border-left:3px solid #E7E5EE']] },
        { id:'m', tag:'CRAFT', tagColor:'#0B6B53', title:'The map chapters read like real survey notes', author:'Civic Ink', initials:'CI', color:'#8E83FF', when:'1d', votes:311, typing:3, count:88, body:'Okafor was an urban planner, and it shows. The bearings, the hatching notes, the margins — I compared them with real survey templates.', digest:'Readers love the authenticity; three planners confirmed the notation is real.', idea:'Readers want a tutorial on how the map chapters were built.', replies:[['Wei Chen','WC','#8E83FF','','','20h','I tried drawing the chapter 3 map. It works. It actually works.','92','']] }
      ],
      salt:[
        { id:'q', tag:'LIVE Q&A TONIGHT', tagColor:'#3B2DC9', title:'Your best lighthouse theory before Dev’s live room', author:'Dev Raman', initials:'DR', color:'#1FC8A0', when:'3h', votes:868, typing:8, count:240, body:'Drop your wildest theory. The best one becomes tomorrow’s #SaltDiaries story — and I’ll read it out live.', digest:'Top theories: the radio predicts the future (38%), the keeper’s sister built it (27%), sequel hints (19%).', idea:'Turn the top 20 questions into a reader FAQ after the session.', replies:[['Priya Nair','PN','#FFC93C','','','2h','The radio is broadcasting from the future. Change my mind.','402',''],['Tomás Ruiz','TR','#FF6B4A','CHALLENGE','background:#FFE8E2;color:#9A2E16','1h','Who built the lighthouse though??','211','']] },
        { id:'e', tag:'SPOILERS', tagColor:'#9A2E16', title:'That ending — let’s talk', author:'Nora L.', initials:'NL', color:'#FF7AC6', when:'2d', votes:540, typing:4, count:310, body:'I finished at 3 a.m. and unplugged my radio. Spoilers below for everyone who’s done.', digest:'Mostly delighted; a few want a sequel to explain the final broadcast.', idea:'Readers are begging for a sequel teaser story.', replies:[['Omar Farouk','OF','#8E83FF','','','1d','The final broadcast was the keeper herself. Has to be.','188','']] }
      ],
      ch:[{ id:'w', tag:'WEEKLY', tagColor:'#9A2E16', title:'Week 3: a city you couldn’t find on a map', author:'Chorus Team', initials:'FT', color:'#5B4BFF', when:'5h', votes:612, typing:21, count:1180, body:'What did you pick, how far are you, and which line made you want to book a ticket?', digest:'Kilometre Zero and Paper Moons are this week’s top picks; 214 reviews posted today.', idea:'Arjun could post a Kilometre Zero itinerary — readers keep asking.', replies:[['Aanya Rao','AR','#8E83FF','YOU','background:#EEECFF;color:#3B2DC9','5h','Paper Moons! “The moon would rust in the rain.” Pune in July, here I come.','88','']] }],
      craft:[{ id:'c', tag:'PROCESS', tagColor:'#3B2DC9', title:'How do daily stories become chapters?', author:'Ravi Menon', initials:'RM', color:'#1FC8A0', when:'6h', votes:402, typing:6, count:96, body:'Mira and Dev both turn daily posts into chapters. How do you decide which ones make it?', digest:'Consensus: watch which stories get “what happens next?” replies, then stack them.', idea:'Mira’s field-log process would make a perfect tutorial.', replies:[['Mira Okafor','MO','#FFC93C','AUTHOR','background:#14121F;color:#FFC93C','4h','If readers ask “what next?” twice, it’s a chapter. That’s my whole rule.','1.1k','']] }]
    };
    const sp = s.sp || 'carto';
    const mine = (s.mine || {})[sp] || [];
    const list = mine.concat(TH[sp]);
    const tid = list.find((t) => t.id === s.tid) ? s.tid : list[0].id;
    const cur = list.find((t) => t.id === tid);
    const V = s.v || {};
    const ex = (s.ex || {})[tid] || [];
    const ph = (s.ph || {})[tid] || 'idle';
    const setPh = (p) => this.setState({ ph: { ...(this.state).ph, [tid]: p } });
    return {
      spaces: SP.map((c) => ({ ...c, hasNew: c.unread > 0 && c.id !== sp, pick: () => this.setState({ sp: c.id, tid: null }), style: c.id === sp ? 'background:#EEECFF' : 'background:transparent' })),
      threads: list.map((t) => ({ ...t, pick: () => { if (t.id !== tid) this.setState({ tid: t.id, pf: !s.pf }); }, style: t.id === tid ? 'background:#fff;border:2px solid #5B4BFF' : 'background:#fff;border:1px solid #E7E5EE' })),
      cur: { ...cur, count: cur.count + ex.length },
      score: (cur.votes + (V[tid] ? 1 : 0)).toLocaleString(),
      up: () => this.setState({ v: { ...V, [tid]: !V[tid] } }),
      upOn: V[tid] ? 'true' : 'false', upBurst: !!V[tid], rollA: V[tid] ? 'roll' : 'roll2', popA: s.pf ? 'pop2' : 'pop',
      upStyle: V[tid] ? 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF' : 'background:#F7F6FB;color:#14121F;border:1px solid #E7E5EE',
      replies: cur.replies.map((r) => ({ name:r[0], initials:r[1], color:r[2], badge:r[3], hasBadge:!!r[3], badgeStyle:r[4], when:r[5], text:r[6], likes:r[7], indent:r[8] })).concat(ex),
      draft: s.draft || '', onDraft: (e) => this.setState({ draft: e.target.value }),
      post: () => { const t = (s.draft || '').trim(); if (!t) return; this.setState({ draft: '', ex: { ...(s.ex || {}), [tid]: ex.concat([{ name:'Aanya Rao', initials:'AR', color:'#8E83FF', badge:'YOU', hasBadge:true, badgeStyle:'background:#EEECFF;color:#3B2DC9', when:'now', text:t, likes:'0', indent:'' }]) } }); },
      spaceName: SP.find((c) => c.id === sp).name,
      newOpen: !!s.newOpen, newExp: s.newOpen ? 'true' : 'false',
      openNew: () => this.setState({ newOpen: true, ntError: '' }), closeNew: () => this.setState({ newOpen: false }),
      ntTitle: s.ntTitle || '', onNtTitle: (e) => this.setState({ ntTitle: e.target.value }),
      ntBody: s.ntBody || '', onNtBody: (e) => this.setState({ ntBody: e.target.value }),
      ntError: s.ntError || '',
      ntTags: ['THEORY', 'QUESTION', 'CRAFT', 'SPOILERS'].map((g) => ({ label: g, on: (s.ntTag || 'QUESTION') === g ? 'true' : 'false', pick: () => this.setState({ ntTag: g }), style: (s.ntTag || 'QUESTION') === g ? 'background:#14121F;color:#fff;border:1px solid #14121F' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE' })),
      createThread: () => {
        const title = (s.ntTitle || '').trim();
        if (title.length < 4) { this.setState({ ntError: 'Give your thread a title (at least 4 characters).' }); return; }
        const id = 'u' + Date.now();
        const thread = { id, tag: s.ntTag || 'QUESTION', tagColor: '#3B2DC9', title, author: 'Aanya Rao', initials: 'AR', color: '#8E83FF', when: 'now', votes: 0, typing: 0, count: 0, body: (s.ntBody || '').trim() || 'No details yet — add the first reply.', digest: 'New thread — Lumen will summarise it once replies come in.', replies: [] };
        this.setState({ mine: { ...(s.mine || {}), [sp]: [thread].concat(mine) }, tid: id, newOpen: false, ntTitle: '', ntBody: '', ntError: '' });
      },
      sumIdle: ph === 'idle', sumLoading: ph === 'loading', sumDone: ph === 'done',
      summarize: () => { setPh('loading'); if (this._t) clearTimeout(this._t); this._t = setTimeout(() => setPh('done'), 1400); }
    };
  }
}
