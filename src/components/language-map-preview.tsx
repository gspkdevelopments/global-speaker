export function LanguageMapPreview() {
  return (
    <div className="map-preview" aria-label="Example personal Language Map">
      <div className="map-preview__header"><span>Personal Language Map</span><span>GS—001</span></div>
      <div className="map-preview__canvas">
        <svg aria-hidden="true" viewBox="0 0 640 390" preserveAspectRatio="none">
          <path d="M320 190 C250 120 205 90 125 78" />
          <path d="M320 190 C400 120 450 92 525 82" />
          <path d="M320 190 C245 255 195 290 118 310" />
          <path d="M320 190 C395 255 448 292 526 310" />
        </svg>
        <div className="map-preview__you"><span>Starting point</span><strong>You</strong><i>EN</i></div>
        <dl className="map-preview__clusters">
          <div className="map-preview__cluster map-preview__cluster--goal"><dt>Goal</dt><dd>Professional confidence</dd></div>
          <div className="map-preview__cluster map-preview__cluster--world"><dt>Environments</dt><dd><span>Work</span><span>Social life</span><span>Travel</span></dd></div>
          <div className="map-preview__cluster map-preview__cluster--interests"><dt>Interests</dt><dd><span>Music</span><span>Technology</span><span>Culture</span></dd></div>
          <div className="map-preview__cluster map-preview__cluster--voice"><dt>Voice</dt><dd><span>Speaking</span><span>Vocabulary</span><span>Natural expression</span></dd></div>
        </dl>
      </div>
      <div className="map-preview__path" aria-hidden="true"><span>Intention</span><i /><span>Real contexts</span><i /><span>Your voice</span></div>
    </div>
  );
}
