const fs = require("fs");
const html = fs.readFileSync("whisk-animation.html", "utf8");
const svgMatch = html.match(/<svg[\s\S]*?<\/svg>/);
if (!svgMatch) {
  console.error("SVG not found");
  process.exit(1);
}

let svg = svgMatch[0];
svg = svg.replace(/class=/g, "className=");
svg = svg.replace(/stroke-width=/g, "strokeWidth=");
svg = svg.replace(/stroke-linecap=/g, "strokeLinecap=");
svg = svg.replace(/stroke-linejoin=/g, "strokeLinejoin=");
svg = svg.replace(/stroke-dasharray=/g, "strokeDasharray=");
svg = svg.replace(/stroke-dashoffset=/g, "strokeDashoffset=");

const preloaderTop = `
"use client";

import { useEffect, useState, useRef } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const stageRef = useRef(null);
  const glowBgRef = useRef(null);

  useEffect(() => {
    const TOTAL = 17;

    const schedule = [
      { idx: 0, dur: 2200, delay: 300 },
      { idx: 1, dur: 800, delay: 1800 },
      { idx: 2, dur: 800, delay: 2200 },
      { idx: 3, dur: 700, delay: 2800 },
      { idx: 4, dur: 600, delay: 3200 },
      { idx: 5, dur: 600, delay: 3600 },
      { idx: 6, dur: 500, delay: 3900 },
      { idx: 7, dur: 700, delay: 4200 },
      { idx: 8, dur: 500, delay: 4600 },
      { idx: 9, dur: 600, delay: 4900 },
      { idx: 10, dur: 600, delay: 5300 },
      { idx: 11, dur: 600, delay: 5600 },
      { idx: 12, dur: 500, delay: 5900 },
      { idx: 13, dur: 700, delay: 6200 },
      { idx: 14, dur: 900, delay: 6600 },
      { idx: 15, dur: 700, delay: 7200 },
      { idx: 16, dur: 500, delay: 7600 },
    ];

    const getS = (i) => document.getElementById("s" + i);
    const getF = (i) => document.getElementById("f" + i);

    function initAll() {
      for (let i = 0; i < TOTAL; i++) {
        const sp = getS(i);
        const fp = getF(i);
        if (sp && fp) {
          const len = sp.getTotalLength();
          sp.style.strokeDasharray = len;
          sp.style.strokeDashoffset = len;
          sp.style.opacity = "0";
          sp.style.transition = "none";
          fp.style.opacity = "0";
          fp.style.transition = "none";
        }
      }
    }

    function animatePath(idx, duration) {
      const sp = getS(idx);
      const fp = getF(idx);
      if (!sp || !fp) return;

      sp.style.opacity = "1";
      sp.style.transition = "stroke-dashoffset " + duration + "ms cubic-bezier(0.4, 0, 0.2, 1)";
      sp.getBoundingClientRect();
      sp.style.strokeDashoffset = "0";

      setTimeout(() => {
        fp.style.transition = "opacity 500ms ease-in";
        fp.style.opacity = "1";
        setTimeout(() => {
          sp.style.transition = "opacity 400ms ease-out";
          sp.style.opacity = "0.06";
        }, 300);
      }, duration);
    }

    const sparkColors = ["#EF2D2F", "#F9CF07", "#FDFDFD", "#ff6b6b", "#ffd93d"];

    function spawnParticles(idx, duration) {
      const sp = getS(idx);
      if (!sp || !stageRef.current) return;
      const totalLen = sp.getTotalLength();
      const count = Math.max(3, Math.floor(totalLen / 80));
      const svgEl = document.querySelector(".logo-svg");
      if (!svgEl) return;
      
      const stageRect = stageRef.current.getBoundingClientRect();
      const svgRect = svgEl.getBoundingClientRect();
      const vb = svgEl.viewBox.baseVal;

      for (let p = 0; p < count; p++) {
        setTimeout(() => {
          if (!stageRef.current) return;
          const progress = Math.random();
          const pt = sp.getPointAtLength(progress * totalLen);
          const sx = svgRect.width / vb.width;
          const sy = svgRect.height / vb.height;
          const px = pt.x * sx + (svgRect.left - stageRect.left);
          const py = pt.y * sy + (svgRect.top - stageRect.top);

          const el = document.createElement("div");
          el.className = "particle";
          const size = 2 + Math.random() * 4;
          el.style.width = size + "px";
          el.style.height = size + "px";
          el.style.left = px + "px";
          el.style.top = py + "px";
          const col = sparkColors[Math.floor(Math.random() * sparkColors.length)];
          el.style.background = col;
          el.style.boxShadow = "0 0 " + (size * 2) + "px " + col;
          
          stageRef.current.appendChild(el);

          const dx = (Math.random() - 0.5) * 40;
          const dy = (Math.random() - 0.5) * 40;

          el.animate(
            [
              { opacity: 0, transform: "scale(0) translate(0,0)" },
              { opacity: 0.9, transform: "scale(1.3) translate(" + (dx * 0.4) + "px," + (dy * 0.4) + "px)", offset: 0.3 },
              { opacity: 0, transform: "scale(0.2) translate(" + dx + "px," + dy + "px)" },
            ],
            {
              duration: 800 + Math.random() * 600,
              easing: "ease-out",
            }
          ).onfinish = () => el.remove();
        }, Math.random() * duration * 0.8);
      }
    }

    function runAnimation() {
      initAll();
      if (glowBgRef.current) {
        glowBgRef.current.classList.remove("active");
      }

      schedule.forEach((item) => {
        setTimeout(() => {
          animatePath(item.idx, item.dur);
          spawnParticles(item.idx, item.dur);
        }, item.delay);
      });

      const last = schedule[schedule.length - 1];
      const finishTime = last.delay + last.dur + 600;

      setTimeout(() => {
        if (glowBgRef.current) glowBgRef.current.classList.add("active");
      }, finishTime);

      setTimeout(() => {
        setLoading(false);
      }, finishTime + 2000); 
    }

    runAnimation();
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader-overlay">
      <div className="stage" ref={stageRef} id="stage">
        <div className="glow-bg" ref={glowBgRef} id="glowBg"></div>
`;
const preloaderBottom = `
      </div>
    </div>
  );
}
`;

fs.writeFileSync("src/components/Preloader.tsx", preloaderTop + svg + preloaderBottom);
console.log("src/components/Preloader.tsx written");
