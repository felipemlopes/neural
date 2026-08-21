import StatsRow from './StatsRow';
import FeaturedVideo from './FeaturedVideo';
import Playlist from './Playlist';
import ProjectsGrid from './ProjectsGrid';
import ResourcesGrid from './ResourcesGrid';

export default function Dashboard({ videoPlaying, onToggleVideo }) {
  return (
    <>
      <StatsRow />

      <div className="video-playlist-grid">
        <FeaturedVideo playing={videoPlaying} onToggle={onToggleVideo} />
        <Playlist />
      </div>

      <ProjectsGrid />
      <ResourcesGrid />
    </>
  );
}
