import Link from "next/link";

export default function NotFound(){return <section className="section"><div className="container" style={{textAlign:"center",maxWidth:700}}><p className="eyebrow">404</p><h1 className="heading">That page could not be found.</h1><p className="lead">Return to the Bweza Pharmacy homepage or contact the team for help.</p><div className="button-row" style={{justifyContent:"center"}}><Link className="button" href="/">Go to homepage</Link><Link className="button button-secondary" href="/contact">Contact us</Link></div></div></section>}
