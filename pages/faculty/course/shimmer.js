import { Breathing } from "react-shimmer";

export default function ShimmerSkeleton() {
  return (
    <div className="text-neutral-500 opacity-30">
      <Breathing
        duration={400}
        width={200}
        height={30}
        className="rounded-md mt-5"
      ></Breathing>
      <Breathing
        duration={400}
        width={250}
        height={30}
        className="rounded-md mt-5"
      ></Breathing>
      <Breathing
        duration={300}
        width={200}
        height={30}
        className="rounded-md mt-5"
      ></Breathing>
      <Breathing
        duration={300}
        width={250}
        height={30}
        className="rounded-md mt-5"
      ></Breathing>
      <Breathing
        duration={300}
        width={200}
        height={30}
        className="rounded-md mt-5"
      ></Breathing>
      <Breathing
        duration={200}
        width={250}
        height={30}
        className="rounded-md mt-5"
      ></Breathing>
    </div>
  );
}
