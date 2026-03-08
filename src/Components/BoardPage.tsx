import { useState, useEffect } from "react";
import Table from "./Board/Board";
import { Box } from "@mui/material";
import type { Boards, Items, Columns } from "../Type";

export default function BoardPage() {
  const [, setBoards] = useState<Boards[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [items, setItems] = useState<Items[]>([]);

  // 1️⃣ טוען boards
  useEffect(() => {
    fetch("/api/boards")
      .then((res) => res.json())
      .then((data: Boards[]) => {
        setBoards(data);
        const defaultBoard = data.find((b) => b.isDefault);
        setActiveBoardId(defaultBoard?.id || null);
      });
  }, []);

  // 2️⃣ טוען columns + items לפי activeBoardId
  useEffect(() => {
    if (!activeBoardId) return;

    fetch(`/api/columns?boardId=${activeBoardId}`)
      .then((res) => res.json())
      .then(setColumns);

    fetch(`/api/items?boardId=${activeBoardId}`)
      .then((res) => res.json())
      .then(setItems);
  }, [activeBoardId]);

  function deleteItem(id: string) {
    fetch(`/api/items/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("Item deleted");
        setItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function aadItem(item: Items) {
    fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        console.log("Item added");
        setItems((prev) => [...prev, item]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box>
      <Table
        columns={columns}
        items={items}
        ondeleteItems={deleteItem}
        onaddItem={aadItem}
        boardId={activeBoardId!}
      />
    </Box>
  );
}
