import { raleway } from "@/app/layout";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="flex px-2 md:p-0 relative overflow-hidden">
      <Input
        className="!rounded-none !rounded-s-[10px] focus:outline-none focus:ring-0 focus-visible:ring-0 md:h-12 md:flex-4/5 md:text-lg"
        placeholder="Search for a game..."
      />

      <ShinyButton
        className={`${raleway.className} md:font-semibold p-2 m-0 border-0 rounded-e-2xl md:h-12 md:flex-1/5 md:text-2xl bg-[var(--primary)] [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:h-full [&>*]:text-[var(--text)]`}
      >
        Track
      </ShinyButton>
    </div>
  );
};

export default Search;
