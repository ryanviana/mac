"use client";

export default function SavePostButton() {
  async function handleClick() {
    const res = await fetch("api/save-post", {
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
  }

  return <button onClick={handleClick}>Login</button>;
}
