import { useEffect, useRef, useState } from "react";
import type { WrapperProps } from "../../types/interface";
import "./wrapper.css";

const Wrapper = <T,>({ subtitle, title, description, items, renderItem }: WrapperProps<T>) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const updateScrollState = () => {
    const el = cardsRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setCanScroll((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  };

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  const scrollBy = (direction: 1 | -1) => {
    const el = cardsRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="wrapper-container">
      {subtitle && <span className="wrapper-subtitle">{subtitle}</span>}
      {title && <h1 className="wrapper-title">{title}</h1>}
      {description && <p className="wrapper-description">{description}</p>}
      <div className="wrapper-cards-wrapper">
        <div
          className={`wrapper-cards-container${canScroll.left ? " has-fade-left" : ""}${canScroll.right ? " has-fade-right" : ""}`}
          ref={cardsRef}
          onScroll={updateScrollState}
        >
          {items.map((item) => renderItem(item))}
        </div>
        {(canScroll.left || canScroll.right) && (
          <div className="wrapper-arrows">
            <button type="button" className="wrapper-arrow" onClick={() => scrollBy(-1)} disabled={!canScroll.left} aria-label="Scorri a sinistra">
              ‹
            </button>
            <button type="button" className="wrapper-arrow" onClick={() => scrollBy(1)} disabled={!canScroll.right} aria-label="Scorri a destra">
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wrapper;