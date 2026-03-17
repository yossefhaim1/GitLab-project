import { useState, useEffect } from "react";
import Table from "./Board/Board";
import { Box } from "@mui/material";
import type { Boards, Items, Columns } from "../Type";
import {
  getBoards,
  getColumns,
  getItems,
  deleteItemById,
  addItemRequest,
  updateItemRequest,
} from "../Api/boardPageApi";

export default function BoardPage() {
  const [, setBoards] = useState<Boards[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [columns, setColumns] = useState<Columns[]>([]);
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    getBoards()
      .then((res) => {
        const data = res.data;
        setBoards(data);

        const defaultBoard = data.find((b) => b.isDefault);
        setActiveBoardId(defaultBoard?.id || null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!activeBoardId) return;

    getColumns(activeBoardId)
      .then((res) => {
        setColumns(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getItems(activeBoardId)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeBoardId]);

  function deleteItem(id: string) {
    deleteItemById(id)
      .then(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addItem(item: Items) {
    addItemRequest(item)
      .then((res) => {
        setItems((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateItem(id: string, changes: Partial<Items>) {
    try {
      const res = await updateItemRequest(id, changes);
      const updatedItem = res.data;

      setItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box>
      <Table
        columns={columns}
        items={items}
        ondeleteItems={deleteItem}
        onaddItem={addItem}
        boardId={activeBoardId!}
        updateItem={updateItem}
      />
    </Box>
  );
}