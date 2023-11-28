export const MiniProfile = () => {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg"
        alt=""
        className="rounded-full border p-[2px] w-14 h-14"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold text-md">Pu pu</h2>
        <h3 className="text-md text-gray-400">Welcome to instagram</h3>
      </div>

      <button className="text-blue-400 text-md ml-2 font-semibold">
        Sign out
      </button>
    </div>
  );
};
