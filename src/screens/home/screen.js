import { ViewModel } from '../../runtime.js';

// Home screen: state, data and every interaction on this page.
export default class HomeScreen extends ViewModel {
  bindings() {
    const s = this.state;
    const ST = [
      { name:'Dev Raman', short:'Dev', initials:'DR', color:'#1FC8A0', ink:'#05332A', tag:'#SaltDiaries · Day 42', when:'18m', text:'The keeper tried to switch the radio off. It said, very politely, that it had a few more names to read.', book:'Salt & Static · chapter 4' },
      { name:'Mira Okafor', short:'Mira', initials:'MO', color:'#14121F', ink:'#FFC93C', tag:'Field log #412', when:'7h', text:'The lamplighter counts in threes: one for the light, one for the dark, one for whoever walks between them.', book:'The Lantern Census · Mar 2027' },
      { name:'Sana Kulkarni', short:'Sana', initials:'SK', color:'#FFC93C', ink:'#2A2000', tag:'Monsoon Notes #13', when:'3h', text:'In our house, monsoon was not a season. It was a guest who never told you when it was leaving.', book:'Paper Moons Over Pune · Feb 2027' },
      { name:'Hana Ishida', short:'Hana', initials:'HI', color:'#FF7AC6', ink:'#3A0C2A', tag:'Darkroom diary', when:'5h', text:'Some photographs only develop when the person in them has finally forgiven you.', book:'The Weight of Light' },
      { name:'Theo Brandt', short:'Theo', initials:'TB', color:'#5B4BFF', ink:'#FFFFFF', tag:'Heist notes', when:'9h', text:'Rule one of robbing a smart city: never let the forecast know your name.', book:'Glasshouse Protocol' },
      { name:'Lena Varga', short:'Lena', initials:'LV', color:'#FF6B4A', ink:'#2A0A02', tag:'Orchard map #8', when:'1d', text:'The smallest god lives in the plum tree. She asks for nothing, which is why everyone is afraid of her.', book:'Orchard of Small Gods' }
    ];
    const seen = s.seen || {};
    const op = s.op;
    const i = op ?? 0;
    const cur = ST[i];
    const go = (n) => { const j = (n + ST.length) % ST.length; this.setState({ op: j, seen: { ...seen, [j]: true }, k: !s.k }); };
    const room = !!s.room;
    const MO = {
      'Mind-bending':[['The Cartographer of Silence','#14121F','Non-linear timelines — your most-highlighted thing.',97],['Glasshouse Protocol','#5B4BFF','Loved by Cartographer readers (4.9).',93],['Orchard of Small Gods','#8E83FF','Slow reveals, mythic worlds.',88]],
      'Cozy':[['Paper Moons Over Pune','#FFC93C','Monsoon kitchens and grandmothers.',96],['Fieldnotes for the End of Summer','#FF7AC6','Poems for one cup of tea.',90],['Kilometre Zero','#FF6B4A','A road trip with a huge heart.',85]],
      'Cry it out':[['The Weight of Light','#FF7AC6','You re-read sad endings. This one earns it.',98],['Fieldnotes for the End of Summer','#D8C7E8','Grief as a never-ending summer.',90],['The Cartographer of Silence','#14121F','The last map will undo you.',86]],
      'Page-turner':[['Salt & Static','#1FC8A0','Short chapters, you binge these at night.',97],['Glasshouse Protocol','#5B4BFF','A heist with zero filler.',92],['Kilometre Zero','#FF6B4A','Every chapter ends at a border.',84]]
    };
    const mood = s.mood || 'Mind-bending';
    const V = s.votes || {};
    const F = s.fol || {};
    const on = 'background:#14121F;color:#fff;border:1px solid #14121F', off = 'background:#fff;color:#14121F;border:1px solid #E7E5EE';
    const SH = [['Salt-air mysteries','4 books · made for you','#EEECFF','#14121F','#1FC8A0','#14121F'],['Monsoon fiction','+148% this week','#FFE8E2','#14121F','#FFC93C','#FF6B4A'],['Cozy heists','2.1k saves','#E3FBF4','#05332A','#5B4BFF','#1FC8A0'],['Debuts to watch','6 books','#FFF4CF','#2A2000','#FF7AC6','#14121F'],['Books that rearrange time','Editors','#14121F','#FFFFFF','#FFC93C','#8E83FF'],['Poetry in one sitting','612 joined','#FFE7F5','#3A0C2A','#D8C7E8','#FF6B4A']];
    const shelves = SH.map(([title, meta, bg, ink, a, b]) => ({ title, meta, bg, ink, a, b }));
    return {
      stories: ST.map((x, j) => ({ ...x, open: () => go(j), ring: seen[j] ? 'background:#D3D0DE' : 'background:conic-gradient(#5B4BFF,#FF7AC6,#FF6B4A,#FFC93C,#5B4BFF)' })),
      storyOpen: op !== undefined && op !== null,
      cur,
      segs: ST.map((x, j) => ({ style: j < i ? 'width:100%' : j === i ? 'width:0;animation:' + (s.k ? 'prog2' : 'prog') + ' 7s linear forwards' : 'width:0' })),
      close: () => this.setState({ op: null }),
      prevStory: () => go(i - 1), nextStory: () => go(i + 1),
      like: () => this.setState({ liked: { ...(s.liked || {}), [i]: !(s.liked || {})[i] } }),
      likeStyle: (s.liked || {})[i] ? 'background:#FF6B4A;color:#fff' : 'background:rgba(0,0,0,.14);color:' + cur.ink,
      likedOn: (s.liked || {})[i] ? 'true' : 'false', likedNow: !!(s.liked || {})[i],
      notifOpen: !!s.notif, notifExp: s.notif ? 'true' : 'false', hasUnread: !s.seenN,
      toggleNotif: () => this.setState({ notif: !s.notif, seenN: true }),
      notifStyle: s.notif ? 'background:#14121F;color:#fff;border:1px solid #14121F' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE',
      notifs: [['Mira Okafor','MO','#14121F','#FFC93C','replied to your theory: “Re-read the dedication.”','2m','#/community'],['Leila Haddad','LH','#1FC8A0','#05332A','invited you to a buddy read of Salt & Static','18m','#/book'],['Your companion','✦','#EEECFF','#3B2DC9','built you a Salt-air mysteries shelf','1h','#/discover'],['Folio','+','#FFC93C','#2A2000','You climbed 41 places this week','3h','#/leaderboard']].map(([who, i2, bg, ink, what, when, href], j) => ({ who, i: i2, bg, ink, what, when, href, d: (j * 0.05) + 's' })),
      roomCount: room ? '1,941' : '1,940',
      toggleRoom: () => this.setState({ room: !room }),
      roomLabel: room ? 'You’re in the room · raise hand' : 'Join the live room',
      roomStyle: room ? 'background:#1FC8A0;color:#05332A' : 'background:#fff;color:#14121F',
      moods: Object.keys(MO).map((k) => ({ label: k, pick: () => this.setState({ mood: k }), style: k === mood ? 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE' })),
      picks: MO[mood].map(([title, bg, why, match], j) => ({ title, bg, why, match, d: (j * .07) + 's' })),
      threads: [
        { id:'a', title:'Is the narrator of Cartographer already gone? (spoilers ch. 1–12)', tag:'#Cartographer', tagColor:'#5B4BFF', meta:'412 replies · 2h', votes:1240, typing:'12 typing' },
        { id:'b', title:'Your best lighthouse theory before tonight’s live room', tag:'#SaltAndStatic', tagColor:'#0B6B53', meta:'240 replies · 3h', votes:868, typing:'8 typing' },
        { id:'c', title:'Week 3 check-in: a city you couldn’t find on a map', tag:'#12BooksAway', tagColor:'#9A2E16', meta:'1,180 replies · 5h', votes:612, typing:'21 typing' }
      ].map((t) => ({ ...t, on: V[t.id] ? 'true' : 'false', burst: !!V[t.id], votes: t.votes + (V[t.id] ? 1 : 0), vote: () => this.setState({ votes: { ...V, [t.id]: !V[t.id] } }), voteStyle: V[t.id] ? 'background:#5B4BFF;color:#fff;border:1px solid #5B4BFF' : 'background:#F7F6FB;color:#14121F;border:1px solid #E7E5EE' })),
      authors: [['Sana Kulkarni','SK','#FFC93C','#2A2000',85,'Magical realism'],['Lena Varga','LV','#FF6B4A','#2A0A02',80,'Fantasy'],['Theo Brandt','TB','#5B4BFF','#fff',82,'Thrillers'],['Hana Ishida','HI','#FF7AC6','#3A0C2A',88,'Literary']].map(([name, initials, color, ink, score, genre]) => ({ name, initials, color, ink, score, genre, pick: () => this.setState({ fol: { ...F, [name]: !F[name] } }), label: F[name] ? 'Following' : 'Follow', style: F[name] ? off : on })),
      shelves: shelves.concat(shelves)
    };
  }
}
