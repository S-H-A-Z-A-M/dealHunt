import { orbitron } from "@/app/layout";
import Search from "@/components/shared/search/SearchBar";
import BentoGrid from "./bentoGrid";
import { Highlighter } from "../ui/highlighter";

const Hero = () => {
  return (
    <>
      <div className="flex gap-10 mt-20 md:mt-20 md:mb-4">
        <div className="flex-1/2">
          <div className={`${orbitron.className} text-4xl md:text-7xl mb-2 `}>
            <Highlighter strokeWidth={3} action="underline" color="var(--secondary)">
              Track
            </Highlighter>{" "}
            Game Deals &
            <Highlighter strokeWidth={3} action="underline" color="var(--secondary)">
              Predict
            </Highlighter>{" "}
            Price Drops
          </div>
          <div className="text-sm md:text-base md:w-2/3  mb-20 text-[var(--text)]">
            Get alerts for your favorite games and see future price trends at a
            glance.
          </div>
          <div>
            <Search />
          </div>
          <div className="mt-4 text-sm text-[var(--text-muted)]">
            Track as many games as you want - it's free!
          </div>
        </div>
        <div className="relative hidden  w-1/2 lg:flex">
          <div
            className="absolute -top-88 -left-130 w-96 h-96 rounded-full bg-[var(--primary)]/50 opacity-50"
            style={{
              filter: "blur(100px)",
              boxShadow: "0 0 150px 80px var(--primary)",
            }}
          />
          <BentoGrid />
        </div>
      </div>
    </>
  );
};

export default Hero;
