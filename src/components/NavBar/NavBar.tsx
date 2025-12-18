import { CircleSmall, GitBranch } from "lucide-react";
import { Link } from "react-router";
import Logo from "@/components/Logo";

const NavBar = () => {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center bg-neutral-2 md:h-[50px]">
			<div className="flex items-center">
				<Logo />
				<Link to="/" className="ml-4 text-text-3">
					Devices
				</Link>
			</div>

			<div className="flex items-center text-text-3 pb-2 md:pb-0 md:mr-8">
				<span>Aigars Uplejs</span>

				<CircleSmall size={16} className="mx-2" />

				<Link to="/readme" className="underline">
					Readme
				</Link>

				<CircleSmall size={16} className="mx-2" />

				<div className="flex items-center">
					<GitBranch size={20} />
					<a
						href="https://github.com/Aigarsss/ui"
						target="_blank"
						className="underline"
						rel="noreferrer"
					>
						Repo
					</a>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
