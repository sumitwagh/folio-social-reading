// Every screen in the app, keyed by its URL hash (#/discover, #/book …).
// To add a screen: create src/screens/<name>/ with template.html, screen.js and style.css,
// then add it here and (optionally) to src/shell/navigation.js.
import HomeScreen from './screens/home/screen.js';
import homeMarkup from './screens/home/template.html?raw';
import homeStyle from './screens/home/style.css?inline';
import DiscoverScreen from './screens/discover/screen.js';
import discoverMarkup from './screens/discover/template.html?raw';
import discoverStyle from './screens/discover/style.css?inline';
import BookScreen from './screens/book/screen.js';
import bookMarkup from './screens/book/template.html?raw';
import bookStyle from './screens/book/style.css?inline';
import AuthorScreen from './screens/author/screen.js';
import authorMarkup from './screens/author/template.html?raw';
import authorStyle from './screens/author/style.css?inline';
import FeedScreen from './screens/feed/screen.js';
import feedMarkup from './screens/feed/template.html?raw';
import feedStyle from './screens/feed/style.css?inline';
import CommunityScreen from './screens/community/screen.js';
import communityMarkup from './screens/community/template.html?raw';
import communityStyle from './screens/community/style.css?inline';
import LeaderboardScreen from './screens/leaderboard/screen.js';
import leaderboardMarkup from './screens/leaderboard/template.html?raw';
import leaderboardStyle from './screens/leaderboard/style.css?inline';
import StudioScreen from './screens/studio/screen.js';
import studioMarkup from './screens/studio/template.html?raw';
import studioStyle from './screens/studio/style.css?inline';
import CreatorScreen from './screens/creator/screen.js';
import creatorMarkup from './screens/creator/template.html?raw';
import creatorStyle from './screens/creator/style.css?inline';

export const ROUTES = {
  '/': { Screen: HomeScreen, markup: homeMarkup, style: homeStyle, nav: 'home', title: 'Home' },
  '/discover': { Screen: DiscoverScreen, markup: discoverMarkup, style: discoverStyle, nav: 'discover', title: 'Discover' },
  '/book': { Screen: BookScreen, markup: bookMarkup, style: bookStyle, nav: 'discover', title: 'Book' },
  '/author': { Screen: AuthorScreen, markup: authorMarkup, style: authorStyle, nav: 'none', title: 'Author' },
  '/feed': { Screen: FeedScreen, markup: feedMarkup, style: feedStyle, nav: 'feed', title: 'Feed' },
  '/community': { Screen: CommunityScreen, markup: communityMarkup, style: communityStyle, nav: 'community', title: 'Community' },
  '/leaderboard': { Screen: LeaderboardScreen, markup: leaderboardMarkup, style: leaderboardStyle, nav: 'leaders', title: 'Leaderboard' },
  '/studio': { Screen: StudioScreen, markup: studioMarkup, style: studioStyle, nav: 'studio', title: 'AI Studio' },
  '/creator': { Screen: CreatorScreen, markup: creatorMarkup, style: creatorStyle, nav: 'creator', title: 'Creator hub' },
};
