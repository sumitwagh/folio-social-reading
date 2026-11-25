import { ViewModel } from '../../runtime.js';

// Author screen: state, data and every interaction on this page.
export default class AuthorScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const f = !!s.f, b = !!s.b, r = !!s.r;
    const tab = s.tab || 'Stories';
    const LG = [
      ['#412','Today','The lamplighter counts in threes: one for the light, one for the dark, one for whoever walks between them.','#14121F','#FFC93C','NEW','1.2k','94'],
      ['#411','Yesterday','Every census misses someone. This one missed a whole street, and the street noticed.','#5B4BFF','#fff','→ LANTERN CENSUS CH. 3','3.4k','287'],
      ['#398','12 Nov','You asked what the Bureau of Sound eats for lunch. Other people’s small talk, lightly salted.','#1FC8A0','#05332A','WRITTEN FROM YOUR COMMENTS','5.1k','612'],
      ['#007','2023','Every map lies about one thing. Mine lies about where the silence begins.','#FFC93C','#2A2000','→ CARTOGRAPHER CH. 9','12.8k','1.4k'],
      ['#410','23 Nov','Lisbon trams go quiet at three. I timed it. Forty-one seconds of nothing.','#FF7AC6','#3A0C2A','','2.2k','140'],
      ['#409','22 Nov','A reader sent me a map of their grandmother’s kitchen. I can’t stop thinking about the drawer marked “later”.','#FF6B4A','#2A0A02','READER-SHAPED','4.0k','318']
    ];
    return {
      toggleFollow: () => this.setState({ f: !f }), followOn: f ? 'true' : 'false', followBurst: f, followLabel: f ? 'Following ✓' : 'Follow', followStyle: f ? 'background:#fff;color:#14121F;border:1px solid #E7E5EE' : 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF',
      followers: f ? '48,213' : '48,212',
      toggleBell: () => this.setState({ b: !b }), bellLabel: b ? 'Story alerts on' : 'Turn on story alerts', bellPressed: b ? 'true' : 'false', bellStyle: b ? 'background:#FFC93C;color:#2A2000;border:1px solid #FFC93C' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE',
      tabs: ['Stories', 'Books', 'Q&A'].map((t) => ({ label: t, pick: () => this.setState({ tab: t }), style: t === tab ? 'background:#14121F;color:#fff' : 'background:transparent;color:#14121F' })),
      isStories: tab === 'Stories', isBooks: tab === 'Books', isQA: tab === 'Q&A',
      logs: LG.map(([no, when, text, bg, ink, badge, likes, replies], j) => ({ no: 'Field log ' + no, when, text, bg, ink, badge, hasBadge: !!badge, likes, replies, d: (j * .05) + 's' })),
      toggleRsvp: () => this.setState({ r: !r }), rsvpLabel: r ? 'You’re going ✓' : 'RSVP', rsvpStyle: r ? 'background:#1FC8A0;color:#05332A' : 'background:#fff;color:#14121F', rsvpCount: r ? '1,121' : '1,120',
      score: [{ l:'Engagement', v:96, c:'#1FC8A0' }, { l:'Feedback', v:92, c:'#FFC93C' }, { l:'Quality', v:95, c:'#8E83FF' }, { l:'Community', v:91, c:'#FF7AC6' }],
      fans: [['1','Leila Haddad','LH','#1FC8A0','4,210'],['2','Atlas Reads','AT','#FFC93C','3,880'],['3','Kabir Sethi','KS','#FF7AC6','3,120']].map(([r2, n, i, c, x]) => ({ r: r2, n, i, c, x }))
    };
  }
}
