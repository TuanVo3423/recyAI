import { MiniProfile, Posts, Stories, Suggestions } from './components';

type Props = {};

export const Feed = (props: Props) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-3xl mx-auto">
      <section className="col-span-2 ">
        <Stories />
        <Posts />
      </section>

      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed -top-4 right-[90px]">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};
