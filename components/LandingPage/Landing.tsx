import Link from "next/link";
import Image from "next/image";
import { Download, BrickWallShield } from "lucide-react";

const Landing = () => {
  return (
    <div className="landing lg:pl-20 lg:pr-20 pl-5 pr-5 bg-background ">
      <header className="w-100vw h-20 pt-4 ">
        <nav className=" p-2  flex items-center justify-between text-white">
          <div className="nav-first flex items-center gap-2">
            <Image
              src={"/images/landing/logo.png"}
              width={40}
              height={40}
              alt=""
            ></Image>

            <h1 className="text-2xl">Daily HQ</h1>
          </div>

          <div className="nav-second flex gap-5 items-center text-gray-200 ">
            <div className="options-container hidden lg:flex  gap-5">
              <Link href={"/features"}>Features</Link>

              <Link href={"/howitworks"}>How it Works</Link>

              <Link href={"/pricing"}>Pricing</Link>
            </div>

            <div className="btn-row flex gap-2 text-white">
              <Link
                className="px-2.5 py-1.5  border border-gray-400 rounded-lg hover:bg-primary-cyan transition-all hover:text-black"
                href={"/login"}
              >
                Login
              </Link>

              <Link
                className="px-2.5 py-1.5  rounded-lg bg-primary-blue hover:bg-primary-cyan transition-all"
                href={"/signup"}
              >
                Start for Free
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="page1
              text-white
              flex flex-col
              lg:flex-row
              items-center
              gap-12
              mt-16
              w-full"
        >
          <div className="left-content flex flex-col gap-5 ">
            <div className="row-1 text-6xl leading-18 font-bold">
              <h1>
                Stop Guessing Your <br /> Shop&apos;s Profit.
                <span className="text-functional-green">Know it.</span>
              </h1>
            </div>

            <div className="row-2 mt-4 mb-4 text-2xl w-[75%] text-text-muted">
              The all-in-one finance dashboard. Assign roles, track staff
              updates daily, and get automated PSL reports.
            </div>

            <div className="row-3 flex items-center gap-2">
              <Link
                className="px-2.5 py-1.5  rounded-lg bg-primary-blue text-xl"
                href={"/signup"}
              >
                Start for Free
              </Link>

              <Link
                className="px-2.5 py-1.5 border rounded-lg text-xl text-primary-blue"
                href={"/login"}
              >
                View Demo
              </Link>
            </div>
          </div>

          <div
            className="
            right-content  p-2 rounded-2xl
            border border-white/5
            shadow-[0_30px_80px_rgba(0,0,0,0.65),0_0_60px_rgba(79,209,197,0.35),0_0_120px_rgba(59,78,255,0.15)] 
            bg-gradient-mast"
          >
            <Image
              src="/images/landing/desktop.png"
              width={1024}
              height={500}
              alt=""
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="page2 pb-15 pt-15">
          <div className="page2header w-full pb-8">
            <h1 className="text-3xl text-center text-white shadow-2xl ">
              How It Works: 3 Simple Steps
            </h1>
          </div>

          <div className="box-wrapper text-white grid  grid-cols-1 lg:grid-cols-3  items-center  gap-8 ">
            <div className="box-div border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="row-1">
                <Image
                  src={"/images/landing/svgs/assign role.png"}
                  width={100}
                  height={100}
                  alt=""
                />
              </div>

              <div className="row-2">
                <h3 className="text-xl">Register & Assign Roles </h3>
              </div>

              <div className="row-3">
                <p className="text-lg text-text-secondary ">
                  Owner sets permissions. Staff gets secore access
                </p>
              </div>
            </div>

            <div className="box-div border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="row-1">
                <Image
                  src={"/images/landing/svgs/staff logs.png"}
                  width={100}
                  height={100}
                  alt=""
                />
              </div>

              <div className="row-2">
                <h3 className="text-xl">Register & Assign Roles </h3>
              </div>

              <div className="row-3">
                <p className="text-lg text-text-secondary ">
                  Owner sets permissions. Staff gets secore access
                </p>
              </div>
            </div>

            <div className="box-div border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="row-1">
                <Image
                  src={"/images/landing/svgs/growth.png"}
                  width={100}
                  height={100}
                  alt=""
                />
              </div>

              <div className="row-2">
                <h3 className="text-xl">You See The Growth </h3>
              </div>

              <div className="row-3">
                <p className="text-lg text-text-secondary ">
                  Instant RSL, Revenue, and Top Product reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page3 pb-5">
          <div className="page2header w-full pb-8">
            <h1 className="text-3xl text-center text-white shadow-2xl font-bold">
              Powerful Features for Shop Owners
            </h1>
          </div>
          <div className="pfs-grid text-white pb-8">
            <div className="grid-container grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-8">
              <div className="first-col ">
                <div className="box-container  border-gray-700  border-2 h-full p-5  rounded-2xl bg-[rgba(82,81,81,0.1)]">
                  <div className="heading text-xl  pb-2">Automated PBL Report</div>
                  <div className="showcase flex items-center justify-between border mt-1.5 p-2 rounded-lg">
                    <div className="linestart">
                      Revenue 
                    </div>
                    <div className="lineend">
                      $25,450
                    </div>
                  </div>
                  <div className="showcase flex items-center justify-between border mt-1.5 p-2 rounded-lg">
                    <div className="linestart">
                      Revenue 
                    </div>
                    <div className="lineend">
                      $25,450
                    </div>
                  </div>
                  <div className="showcase flex items-center justify-between border mt-1.5 p-2 rounded-lg">
                    <div className="linestart">
                      Revenue 
                    </div>
                    <div className="lineend">
                      $25,450
                    </div>
                  </div>
                  <div className="showcase flex items-center justify-between border mt-1.5 p-2 rounded-lg">
                    <div className="linestart">
                      Revenue 
                    </div>
                    <div className="lineend">
                      $25,450
                    </div>
                  </div>
                  <div className="btn-here pt-3">
                    <Link href={'/download'} className="px-4 py-2 bg-primary-blue text-white font-bold  rounded-lg flex items-center gap-2 "><Download /> Download PDF</Link>
                  </div>
                </div>
              </div>
              <div className="second-col ">
                <div className="box-container  border-gray-700  border-2 h-full p-5  rounded-2xl bg-[rgba(82,81,81,0.1)] ">
                  <div className="heading text-xl  pb-2">Staff Role Management</div>

                {/* Item 1 */}
                <div className="flex items-start gap-3 mb-4">
                  <Image
                    width={9}
                    height={9}
                    src="https://i.pravatar.cc/40?img=3"
                    className="w-9 h-9 rounded-full"
                    alt="Rahul"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Rahul updated inventory
                    </p>
                    <p className="text-xs text-gray-400">
                      Stock expenses inventory
                    </p>
                    <span className="inline-block mt-1 rounded-md bg-green-500/20 px-2 py-[2px] text-xs text-green-400">
                      Beverage
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3 mb-4">
                  <Image
                  width={9}
                    height={9}
                    src="https://i.pravatar.cc/40?img=5"
                    className="w-9 h-9 rounded-full"
                    alt="Rahul"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Rahul uploaded inventory
                    </p>
                    <p className="text-xs text-gray-400">
                      Store sales & product info daily
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3">
                  <Image
                  width={9}
                    height={9}
                    src="https://i.pravatar.cc/40?img=8"
                    className="w-9 h-9 rounded-full"
                    alt="Rahul"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Rahul updated
                    </p>
                    <p className="text-xs text-gray-400">
                      Summary sales & inventory daily
                    </p>
                  </div>
                </div>

                </div>
              </div>
              <div className="third-col  flex flex-col gap-5">
                <div className="box-container border-gray-700  border-2 h-full p-5  rounded-2xl bg-[rgba(82,81,81,0.1)]">
                  <div className="heading text-xl  pb-2">Best Selling Items</div>
                </div>
                <div className="box-container border-gray-700  border-2 h-full p-5  rounded-2xl bg-[rgba(82,81,81,0.1)]">
                  <div className="heading text-xl  pb-2">Multi Store Chains</div>
                </div>
              </div>
            </div>
          </div>
          <div className="assure-security border-gray-700  border h-full p-2  rounded-2xl bg-linear-to-r from-gray-700 via-rgba(255,255,255,0.4) to-rgba(39, 194, 116,0.4) text-white flex items-center gap-5  ">
            <div className="col-1 bg-gray-800 p-3 rounded-lg text-functional-green">
              <BrickWallShield size={50}/>
            </div>
            <div className="col-2">
              <p className="text-2xl font-bold">Enterprise-Grade Security</p>
              <p className="text-text-secondary">Enterprise-Grade Security access to ombaaliast relentemerative audivation moos lmmds.</p>
            </div>
          </div>
        </div>

        <div className="page4 pb-5">
          <div className="page2header w-full pb-8">
            <h1 className="text-3xl text-center text-white shadow-2xl font-bold">
              Built For Your Business
            </h1>
          </div>
          <div className="grid-container text-white flex gap-5 items-center flex-col lg:flex-row">
            <div className="box-container  border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="first-row">
                <Image src={'/images/landing/svgs/retail_shops.png'} width={100} height={100} alt=""/>
              </div>
              <div className="second-row">
                <h1 className="text-2xl font-bold">Retail Shops</h1>
              </div>
              <div className="third-row">
                <p className="text-text-secondary"><span className="text-functional-green ">Retail Shops</span> can manage inventory, sales, and customer data in one place.</p>
              </div>
            </div>
             <div className="box-container  border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="first-row">
                <Image src={'/images/landing/svgs/retail_shops.png'} width={100} height={100} alt=""/>
              </div>
              <div className="second-row">
                <h1 className="text-2xl font-bold">Retail Shops</h1>
              </div>
              <div className="third-row">
                <p className="text-text-secondary"><span className="text-functional-green ">Retail Shops</span> can manage inventory, sales, and customer data in one place.</p>
              </div>
            </div>
             <div className="box-container  border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="first-row">
                <Image src={'/images/landing/svgs/retail_shops.png'} width={100} height={100} alt=""/>
              </div>
              <div className="second-row">
                <h1 className="text-2xl font-bold">Retail Shops</h1>
              </div>
              <div className="third-row">
                <p className="text-text-secondary"><span className="text-functional-green ">Retail Shops</span> can manage inventory, sales, and customer data in one place.</p>
              </div>
            </div>
            <div className="box-container  border-gray-700  border-2 h-full p-5 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.1)] ">
              <div className="first-row">
                <Image src={'/images/landing/svgs/retail_shops.png'} width={100} height={100} alt=""/>
              </div>
              <div className="second-row">
                <h1 className="text-2xl font-bold">Retail Shops</h1>
              </div>
              <div className="third-row">
                <p className="text-text-secondary"><span className="text-functional-green ">Retail Shops</span> can manage inventory, sales, and customer data in one place.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="page5 flex items-center flex-col lg:flex-row gap-2 mt-10 mb-10">
          <div className="first text-white">
            <div className="row1 text-xl text-text-secondary">
              <p>Profit Clarity at a Glance</p>
            </div>
            <div className="row2">
              <h1 className="text-8xl font-bold">Visualise Your <span className="text-functional-green">Success.</span></h1>
            </div>
            <div className="row3">
              <p className="text-text-secondary w-[70%]">Get instant insights into your shop&apos;s performance with our intuitive dashboard. Track sales, expenses, and profit margins in real-time, empowering you to make informed decisions that drive growth.</p>
            </div>
          </div>
          <div className="second  border-gray-700  border h-full p-3 flex items-center  flex-col rounded-2xl bg-[rgba(82,81,81,0.2)]">
            <Image src={'/images/landing/margin_bottom.png'} width={900} height={400} alt=""  className="rounded-lg"/>
          </div>
          </div>

        <footer>
          <div className="line bg-gray-800 h-1 w-full rounded-xl"></div>
          <div className="footer-container text-white flex flex-col lg:flex-row justify-between items-center gap-5 p-5">
            <div className="first">
              <h1 className="text-4xl">Daily HQ</h1>
            </div>
            <div className="second flex items-center gap-4 text-gray-200">
              <Link href={'/'}>Support</Link>
              <Link href={'/'}>Privacy</Link>
              <Link href={'/'}>Terms</Link>
              <Link href={'/'}>Contact</Link>
            </div>
            <div className="third text-gray-200">
              <p>@ 2025 Daily HQ. All rights reserved</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Landing;
