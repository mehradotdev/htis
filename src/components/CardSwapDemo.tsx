import { Code, Sliders } from "lucide-react";
import CardSwap, { Card } from "./ui/CardSwap";

const CardSwapDemo = () => {
  return (
    <div
      // style={{ width: "100%", height: "400px" }}
      className="absolute -right-[22%] w-full h-full overflow-y-clip"
    >
      <CardSwap
        cardDistance={60}
        verticalDistance={60}
        delay={5000}
        skewAmount={0}
        easing={"elastic"}
        pauseOnHover={false}
        width={600}
      >
        <Card
          customClass="one"
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div className="flex p-2 gap-2 bg-background border-b border-foreground items-center">
            {/* Circle Icon */}
            <div className="size-[18px] bg-foreground rounded-full z-10" />
            Smooth
          </div>
          <div className="relative m-4 overflow-hidden h-200">
            <img
              src={"/cs1.webp"}
              alt="Card Swap Demo 1"
              className="absolute inset-0 size-full object-cover scale-[1.08]"
            />
          </div>
        </Card>
        <Card
          customClass="two"
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div className="flex p-2 gap-2 bg-background border-b border-foreground items-center">
            <Code />
            Reliable
          </div>
          <div style={{ position: "relative", flex: 1 }} className="m-4">
            <img
              src={"/cs2.webp"}
              alt="Card Swap Demo 2"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </Card>
        <Card
          customClass="three"
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div className="flex p-2 gap-2 bg-background border-b border-foreground items-center">
            <Sliders />
            Customizable
          </div>
          <div style={{ position: "relative", flex: 1 }} className="m-4">
            <img
              src={"/cs3.webp"}
              alt="Card Swap Demo 3"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </Card>
      </CardSwap>
    </div>
  );
};

export default CardSwapDemo;
