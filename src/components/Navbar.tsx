import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-8 flex justify-between items-center">
      <div>
        <span className="text-3xl font-bold">PIXISIDE</span>
      </div>
      <div>
        <ul>
          <li className="text-blue-500">
            <Link href="/search/asd" passHref>
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
