import Link from "next/link";
function ScheduleHeader() {
  //<div className="navLink">
  //<Link href="/rec-portal">REC Portal</Link>
  //</div>
  return (
    <div className="secondHeader">
      <div className="navLinks">
        <div className="secondHeaderLink">
          <Link href="/codes-schedules/compare">Compare Schedule Versions</Link>
        </div>
      </div>
    </div>
  );
}

export default ScheduleHeader;
