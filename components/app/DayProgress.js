export default function DayProgress({ dayName, progress, highlight }) {
  const dotPercent = 1 / 3;

  return (
    <div className={`DayProgress ${highlight ? "is-highlighted" : ""}`}>
      <div className="day">{dayName}</div>
      <div className="duration">
        {[0, 1, 2].map(i => (
          <div className="dot" key={`dot-${i}`}>
            <div
              className="dot-in"
              style={{
                width: `${Math.min(
                  Math.max((progress - i * dotPercent) / dotPercent, 0),
                  1
                ) * 100}%`
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .DayProgress {
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          min-height: 5em;
          box-sizing: border-box;
        }
        .DayProgress.is-highlighted {
          border: 3px solid var(--primary);
        }
        .day {
          font-family: var(--serif);
          font-size: 1.2em;
          color: #2d2c3d;
        }
        .duration {
        }
        .dot {
          background: #e5e5e5;
          display: inline-block;
          width: 9px;
          height: 9px;
          margin: 0 3px;
          border-radius: 9px;
          overflow: hidden;
        }
        .dot-in {
          background: var(--primary);
          display: block;
          width: 9px;
          height: 9px;
        }
      `}</style>
    </div>
  );
}
