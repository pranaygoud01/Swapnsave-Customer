import React from "react";
import { Link } from "@tanstack/react-router";

const Categories = () => {
  return (
    <section className="w-full bg-[#ffffff] py-10 max-lg:py-6 overflow-hidden font-sans">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px] lg:auto-rows-[320px]">

          {/* ----- 1: BOOKS (Tall Purple) Maps to Customization ----- */}
          <Link to="/books" className="group relative bg-[#b29de2] rounded-[48px] max-lg:rounded-[20px] p-8 lg:col-span-1 lg:row-span-2 overflow-hidden flex flex-col hover:scale-[1.01] transition-transform duration-300 shadow-sm hover:shadow-xl">
            <h3 className="text-[2.25rem] font-serif font-semibold text-indigo-950 mb-3 tracking-tight leading-none">Academic Books</h3>
            <p className="text-indigo-950/80 text-sm font-medium leading-snug w-3/4">
              Buy & sell second-hand academic textbooks on campus.
            </p>
            {/* Mockup float - two overlapping book covers */}
            <div className="relative mt-8 md:mt-12 flex-1 justify-center items-center flex max-md:absolute max-md:bottom-12 max-md:right-12 max-md:scale-[0.55] max-md:origin-bottom-right">
              {/* Back Book */}
              <div className="absolute w-[150px] h-[220px] bg-white rounded-xl shadow-lg transform -rotate-[8deg] -translate-x-[40px] border border-neutral-100 flex flex-col overflow-hidden group-hover:-translate-y-2 group-hover:rotate-[-12deg] transition-all duration-500">
                <div className="h-[140px] bg-[#60a5fa] mb-2 relative overflow-hidden flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-white/20"></div>
                </div>
                <div className="px-4 py-2">
                  <div className="h-2 w-3/4 bg-neutral-200 rounded-full mb-2"></div>
                  <div className="h-2 w-1/2 bg-neutral-200 rounded-full"></div>
                </div>
              </div>
              {/* Front Book */}
              <div className="absolute w-[160px] h-[240px] bg-[#fef08a] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] transform rotate-[10deg] translate-x-[30px] border border-white flex flex-col p-5 overflow-hidden group-hover:-translate-y-4 group-hover:rotate-[14deg] transition-all duration-500 z-10">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#fb923c] rounded-bl-full flex items-center justify-center shadow-inner"><span className="text-[10px] font-bold text-white mb-2 ml-2 tracking-widest">SALE</span></div>
                <div className="mt-8">
                  <div className="text-amber-900 font-bold font-serif leading-tight text-xl mb-3">Data<br />Structures</div>
                  <div className="h-1.5 w-1/2 bg-amber-900/20 rounded-full mb-1.5"></div>
                  <div className="h-1.5 w-1/3 bg-amber-900/20 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Toolbar mock from the original image */}
            <div className="mt-auto bg-white backdrop-blur-md rounded-[24px] p-4 flex justify-between shadow-2xl relative z-20 mx-1 mb-2 group-hover:translate-y-1 transition-transform duration-500 max-md:scale-[0.75] max-md:origin-bottom max-md:w-[90%] max-md:self-center">
              {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'].map((btn, i) => (
                <div key={btn} className="flex flex-col items-center gap-2 cursor-pointer">
                  <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center font-bold text-lg ${i === 0 ? 'bg-blue-50 text-blue-500' : i === 1 ? 'bg-rose-50 text-rose-500' : i === 2 ? 'bg-amber-50 text-amber-500' : 'bg-[#e0f2fe] text-[#0284c7]'}`}>
                    {['1', '2', '3', '4'][i]}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold">{btn}</span>
                </div>
              ))}
            </div>
          </Link>

          {/* ----- 2: GADGETS (Wide Pink) Maps to Scheduling ----- */}
          <Link to="/gadgets" className="group max-lg:rounded-[20px]  relative bg-[#f478a8] rounded-[48px] p-8 lg:col-span-2 lg:row-span-1 overflow-hidden flex flex-col md:flex-row hover:scale-[1.01] transition-transform duration-300 shadow-sm hover:shadow-xl">
            <div className="relative z-20 w-full md:w-5/12 flex flex-col justify-start pt-4">
              <h3 className="text-[2.25rem] font-serif font-semibold text-[#831843] mb-3 tracking-tight leading-none">Gadgets</h3>
              <p className="text-[#831843]/80 text-sm font-medium leading-snug w-11/12">
                Laptops, calculators, phones and electronics for your studies.
              </p>
            </div>

            {/* Overlapping calendar / date picker mockup exactly like the image's "Scheduling" */}
            <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:right-0 w-full md:w-2/3 h-[130%] pointer-events-none flex justify-end z-10 max-md:scale-[0.55] max-md:origin-bottom-right">
              {/* Background card angled (like the birthday card in image) */}
              <div className="absolute right-32 top-10 w-[240px] h-[320px] bg-[#2dd4bf] -rotate-[14deg] rounded-3xl border-[10px] border-white shadow-xl flex flex-col overflow-hidden group-hover:rotate-[-10deg] transition-all duration-500">
                <div className="bg-[#f97316] w-full h-14 flex gap-2.5 p-3 border-b-4 border-white items-center">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="flex-1 h-3 rounded-full bg-white opacity-40"></div>)}
                </div>
                <div className="flex-1 bg-white/20 p-4 border-l-[12px] border-[#f97316]/80 flex items-center justify-center">
                  <h4 className="text-white font-bold text-5xl transform -rotate-[15deg] translate-y-4 tracking-widest opacity-90 drop-shadow-md">TECH</h4>
                </div>
              </div>

              {/* Foreground picker angled (like the set date white box in image) */}
              <div className="absolute right-6 top-12 w-[280px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 rotate-[8deg] border border-neutral-100 flex flex-col group-hover:rotate-[4deg] group-hover:-translate-y-2 transition-all duration-500">
                <h4 className="text-[13px] font-bold text-neutral-800 text-center mb-6 mt-2">When do you need it by?</h4>

                <div className="flex justify-between items-center text-[13px] text-neutral-300 mb-4 px-4 font-semibold">
                  <span>August</span> <span>18</span>
                </div>

                <div className="bg-neutral-100/60 rounded-2xl p-4 flex justify-between items-center text-[15px] font-bold text-black border-l-[3px] border-l-black mx-1 relative shadow-sm">
                  <span className="text-rose-500">September</span> <span>20</span>
                  {/* Faded times on the side */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-20 text-[10px] flex flex-col gap-3 items-end w-16">
                    <span>4:00 AM</span>
                    <span className="text-black font-bold opacity-100 text-[11px]">5:00 AM</span>
                    <span>6:00 AM</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[13px] text-neutral-300 mt-4 px-4 font-semibold">
                  <span>October</span> <span>21</span>
                </div>
                <div className="flex justify-between items-center text-[13px] text-neutral-200 mt-3 px-4 font-semibold">
                  <span>November</span> <span>22</span>
                </div>

                <div className="mt-8 bg-[#18181b] text-white text-[12px] font-bold py-4 rounded-full text-center shadow-lg">Set Details</div>
                <div className="w-20 h-1 bg-black/20 self-center mt-4 rounded-full"></div>
              </div>
            </div>
          </Link>

          {/* ----- 3: PROJECTS (Square Green) Maps to Wallet ----- */}
          <Link to="/projects" className="group max-lg:rounded-[20px]  relative bg-[#bcdb8a] rounded-[48px] p-8 lg:col-span-1 lg:row-span-1 overflow-hidden flex flex-col justify-end hover:scale-[1.01] transition-transform duration-300 shadow-sm hover:shadow-xl">

            {/* floating wallet card top (like Givingli Cash card in image) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[85%] z-10 h-32 pointer-events-none block max-md:scale-[0.65] max-md:origin-top max-md:-top-0 md:top-10">
              {/* back cards */}
              <div className="absolute top-0 w-full h-[140px] bg-[#ea580c] rounded-[24px] -rotate-[8deg] transform origin-bottom-left shadow-lg"></div>
              <div className="absolute top-2 w-full h-[140px] bg-white rounded-[24px] rotate-[4deg] transform origin-bottom-right shadow-lg"></div>

              {/* Front dark card */}
              <div className="absolute top-6 left-0 w-[105%] -translate-x-[2.5%] h-[140px] bg-[#1f2937] rounded-[24px] shadow-2xl p-6 flex flex-col text-white group-hover:-translate-y-3 transition-transform duration-500">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-neutral-300 tracking-wide">Project Funds</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div className="flex items-start gap-1">
                    <span className="text-lg text-neutral-400 mt-1 font-medium">$</span>
                    <span className="text-5xl font-bold tracking-tight">132.00</span>
                  </div>
                  <div className="text-[9px] font-bold text-neutral-400 py-1.5 px-3 bg-white/10 rounded-lg tracking-widest backdrop-blur-sm mb-1">REDEEM</div>
                </div>
              </div>
            </div>

            <div className="relative z-20 mt-auto pt-24 md:pt-32">
              <h3 className="text-[2.25rem] font-serif font-semibold text-[#14532d] mb-2 tracking-tight leading-none">Projects</h3>
              <p className="text-[#14532d]/80 text-sm font-medium leading-snug w-11/12">
                Access your tech assignments and save up your campus funds.
              </p>
            </div>
          </Link>

          {/* ----- 4: NOTES (Square Yellow) Maps to Inbox ----- */}
          <Link to="/notes" className="group max-lg:rounded-[20px]  relative bg-[#fce473] rounded-[48px] p-8 lg:col-span-1 lg:row-span-1 overflow-hidden flex flex-col hover:scale-[1.01] transition-transform duration-300 shadow-sm hover:shadow-xl">
            <div className="relative z-20 pt-2">
              <h3 className="text-[2.25rem] font-serif font-semibold text-yellow-950 mb-2 tracking-tight leading-none">Notes</h3>
              <p className="text-yellow-950/80 text-sm font-medium leading-snug w-5/6">
                Organize your study guides, chat lists, and sent notes.
              </p>
            </div>

            {/* List mockup from Inbox */}
            <div className="absolute bottom-[-10px] right-[-10px] left-[-2px] md:bottom-[-20px] md:right-[-20px] md:left-4 bg-white rounded-tl-[40px] rounded-bl-[40px] md:rounded-bl-none p-5 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex flex-col gap-4 z-10 border border-neutral-100 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 max-md:scale-[0.55] max-md:origin-bottom-right max-md:w-[130%]">

              {[
                { name: "Engineering Math", sub: "Calculus Unit 1! • Apr 25", initials: "EM", color: "bg-[#065f46] text-[#d1fae5]", img: "EM" },
                { name: "Data Structures", sub: "Graphs and Trees • Apr 22", initials: "DS", color: "bg-[#5b21b6] text-[#ede9fe]", img: "DS" },
                { name: "Physics Lab", sub: "Sem 2 Records • Apr 20", initials: "PL", color: "bg-[#fcd34d] text-[#78350f]", img: "PL" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full ${item.color} flex items-center justify-center font-bold text-sm shadow-sm shrink-0`}>
                    {item.img}
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden mr-2">
                    <span className="text-[14px] font-bold text-neutral-800 truncate">{item.name}</span>
                    <span className="text-[11px] font-medium text-neutral-400 truncate">{item.sub}</span>
                  </div>
                  <div className="w-9 h-9 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50">
                    <svg className="w-4 h-4 ml-[1px]" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  </div>
                </div>
              ))}
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Categories;

