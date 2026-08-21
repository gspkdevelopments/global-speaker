export function LanguageMapPreview() {
  return (
    <div className="map-preview" aria-label="Example personal Language Map">
      <div className="map-preview__header"><span>Personal Language Map</span><span>GS—001</span></div>
      <div className="map-preview__language"><span>Language</span><strong>English</strong><i>EN</i></div>
      <dl>
        <div><dt>Goal</dt><dd>Professional confidence</dd></div>
        <div><dt>Environments</dt><dd><span>Work</span><span>Social life</span><span>Travel</span></dd></div>
        <div><dt>Interests</dt><dd><span>Music</span><span>Technology</span><span>Culture</span></dd></div>
        <div><dt>Focus</dt><dd><span>Speaking</span><span>Vocabulary</span><span>Natural expression</span></dd></div>
      </dl>
      <div className="map-preview__path" aria-hidden="true"><span>You</span><i /><span>Your world</span><i /><span>Your voice</span></div>
    </div>
  );
}
