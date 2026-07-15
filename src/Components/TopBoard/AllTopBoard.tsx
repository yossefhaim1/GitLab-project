import { BoardActionsMenu } from "./BoardActionsMenu";
import { Search } from "./Search";
import { ListOfBoards } from "./ListOfBoards";
import { SetDefaultBoardButton } from "./SetDefaultBoardButton";
import { Badge, Box } from "@mui/material";
import { useItemsWithoutPriority } from "../../Hook/useItemsWithoutPriority";
import { ProfileAvatar } from "../../Profile_button/Profile";

export function AllTopBoard() {
  const { count: itemsWithoutPriorityCount } = useItemsWithoutPriority();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 0.75,
        minHeight: 40,

        // Keep all top controls visually aligned with the same vertical rhythm.
        "& .MuiButton-root": { height: 40 },
        "& .MuiIconButton-root": { width: 40, height: 40 },
      }}
    >
      <ProfileAvatar />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListOfBoards />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: 420 },
          maxWidth: 420,
          display: "flex",
          alignItems: "center",
          position: { xs: "static", md: "absolute" },
          left: { md: "50%" },
          transform: { md: "translateX(-50%)" },
        }}
      >
        <Search />
      </Box>

      <Box
        sx={{
          ml: { xs: 0, md: "auto" },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ mr: { xs: 1, md: 2.5 } }}>
          <SetDefaultBoardButton />
        </Box>
        <Badge
          badgeContent={itemsWithoutPriorityCount}
          color="error"
          invisible={itemsWithoutPriorityCount === 0}
          // שימוש במיקום דיפולטיבי מדויק במקום הזזה ידנית אגרסיבית
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left", // שינוי לשמאל כדי למנוע התנגשות עם הטקסט מימין
          }}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "18", // שימוש ביחידות rem לפונט פרופורציונלי
              fontWeight: "bold", // הדגשת המספר לקריאות משופרת
              height: 20,
              minWidth: 20  ,
              padding: "0 4px", // ריפוד פנימי למניעת עיוות כשהמספר גדל לדו-ספרתי
              border: "2px solid #fff", // קו מתאר לבן שמפריד את התג מהאייקון (אפקט מקצועי)
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)", // הצללה עדינה
            },
          }}
        >
          <BoardActionsMenu />
        </Badge>
      </Box>
    </Box>
  );
}
