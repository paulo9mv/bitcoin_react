import React from "react";

const FooterMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        height: 50,
        backgroundColor: "#333",
        color: "#fff",
        position: "fixed",
        bottom: 0
      }}
    >
     
          <div     
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1
            }}
          >
            <span style={{ fontSize: 20 }}>💻 Made by Paulo Viana</span>
          </div>
        
    </div>
  );
};

export default FooterMenu;