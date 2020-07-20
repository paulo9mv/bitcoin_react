import React from "react";

export function ErrorMessage() {
  return (
    <div style={styles.error}>
      <b>Não foi possível atualizar. Tente mais tarde.</b>
    </div>
  );
}

const styles = {
  error: {
    fontSize: 16,
    marginTop: 50,
    backgroundColor: "rgba(255,0,0,0.6)",
  },
};
