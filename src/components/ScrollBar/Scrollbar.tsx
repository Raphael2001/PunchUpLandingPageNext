import React, { useCallback, useEffect, useRef, useState } from "react";

import basic from "./Scrollbar.module.scss";

type Props = {
  extraStyles?: any;
  children: React.ReactElement;
  className?: string;
};

function Scrollbar({ extraStyles = {}, children, className = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [shouldHideScrollbar, setShouldHideScrollbar] = useState(false);

  function styles(className: string) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  useEffect(() => {
    measureContent();
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      measureContent();
    });

    if (contentRef.current) {
      ro.observe(contentRef.current);
    }
  }, [contentRef.current]);

  const handleScrollContent = () => {
    const thumbEle = thumbRef.current;
    const contentEle = contentContainerRef.current;
    if (!thumbEle || !contentEle) {
      return;
    }
    thumbEle.style.top = `${
      (contentEle.scrollTop * 100) / contentEle.scrollHeight
    }%`;
  };

  const handleClickTrack = (e) => {
    const trackEle = trackRef.current;
    const contentEle = contentContainerRef.current;
    if (!trackEle || !contentEle) {
      return;
    }
    const bound = trackEle.getBoundingClientRect();
    const percentage = (e.clientY - bound.top) / bound.height;
    contentEle.scrollTop =
      percentage * (contentEle.scrollHeight - contentEle.clientHeight);
  };

  function measureContent() {
    const thumbEle = thumbRef.current;
    const contentEle = contentContainerRef.current;
    if (!thumbEle || !contentEle) {
      return;
    }
    const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
    if (scrollRatio < 1) {
      setShouldHideScrollbar(false);

      thumbEle.style.height = `${scrollRatio * 100}%`;
    } else {
      setShouldHideScrollbar(true);
    }
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const ele = thumbRef.current;
    const contentEle = contentContainerRef.current;
    if (!ele || !contentEle) {
      return;
    }
    const startPos = {
      top: contentEle.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    const handleMouseMove = (e: React.MouseEvent | any) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
      updateCursor(ele);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      resetCursor(ele);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    const ele = thumbRef.current;
    const contentEle = contentContainerRef.current;
    if (!ele || !contentEle) {
      return;
    }
    const touch = e.touches[0];
    const startPos = {
      top: contentEle.scrollTop,
      x: touch.clientX,
      y: touch.clientY,
    };

    const handleTouchMove = (e: React.TouchEvent | any) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.x;
      const dy = touch.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
      updateCursor(ele);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      resetCursor(ele);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  }, []);

  const updateCursor = (ele: HTMLDivElement) => {
    ele.style.userSelect = "none";

    document.body.style.userSelect = "none";
  };

  const resetCursor = (ele: HTMLDivElement) => {
    ele.style.userSelect = "";
    document.body.style.userSelect = "";
  };

  return (
    <div className={`${styles("wrapper")} ${className}`}>
      <div
        id={"test"}
        className={styles("container-content")}
        ref={contentContainerRef}
        onScroll={handleScrollContent}
      >
        <div ref={contentRef}>{children}</div>
      </div>

      <div
        className={`${styles("scrollbar")} ${
          shouldHideScrollbar ? styles("hide") : ""
        }`}
      >
        <div
          className={styles("scrollbar-track")}
          ref={trackRef}
          onClick={handleClickTrack}
        />
        <div
          className={styles("scrollbar-thumb")}
          ref={thumbRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
    </div>
  );
}

export default Scrollbar;
