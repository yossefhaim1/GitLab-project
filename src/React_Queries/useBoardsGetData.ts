import { useQuery } from "@tanstack/react-query";
import { API } from "../Api/boardPageApi";

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: API.getBoards,
    staleTime: 1000 * 60 * 5, // כמה זמן המידע ניחשב
    gcTime: 1000 * 60 * 10, // כמה זמן המידע ניחשב
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 1000 * 60 * 5,
    refetchOnMount: true,
    retry: 2,
    placeholderData: [],
    select: (boards) => {
      const defaultBoardId = boards.find((board) => board.isDefault)?.id;
      return { boards, defaultBoardId };
    },
  });
}

export function useColumns(boardId: number | undefined) {
  return useQuery({
    queryKey: ["columns", boardId],
    queryFn: () => API.getColumns(boardId!),
    enabled: boardId !== undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 1000 * 60 * 5,
    refetchOnMount: false,
    retry: 2,
    placeholderData: [], 
    select: (columns) => [...columns].sort((a, b) => a.id - b.id),
  });
}

export function useItems(boardId: number | undefined) {
  return useQuery({
    queryKey: ["items", boardId],
    queryFn: () => API.getItems(boardId!),
    enabled: boardId !== undefined, // לא להפעיל את השאילתה עד שיש boardId תקין
    placeholderData: [], // להחזיר מערך ריק בזמן שהנתונים נטענים כדי למנוע שגיאות בקומפוננטה
    // initialData: [], // אפשר להגדיר נתונים התחלתיים כדי למנוע שגיאות בקומפוננטה לפני שהנתונים מגיעים מהשרת והוא שונה מ placeholderData כדי שהקומפוננטה תדע שהנתונים עוד לא נטענו
    staleTime: 1000 * 60 * 5, //5 דקות שלא יחשיב את הנתונים כ"ישנים" וירענן אותם אוטומטית
    gcTime: 1000 * 60 * 10, // 10 דקות לפני שהנתונים יוסרו מהזיכרון אם לא משתמשים בהם
    refetchOnWindowFocus: false, // לא לרענן אוטומטית כשחוזרים לטאב של הדפדפן
    retry: 2, //  לנסות שוב אוטומטית אם יש שגיאה (כמו בעיה בשרת)
    refetchInterval: 1000 * 60 * 5, // לרענן את הנתונים כל 5 דקות כדי לקבל עדכונים בזמן אמת
    // אפשר להוסיף כאן לוגיקה לסינון או עיבוד של הפריטים לפני שהם מגיעים לקומפוננטה
    select: (items) => [...items].sort((a, b) => a.id - b.id), // לדוגמה, למיין את הפריטים לפי ID בסדר עולה
    refetchOnMount: false, // לא לרענן אוטומטית כשקומפוננטה נטענת אם הנתונים כבר קיימים וטריים
    refetchOnReconnect: false, // לא לרענן אוטומטית כשיש חיבור מחדש לאינטרנט
  });
}

export function useUsers(){
  return useQuery({
    queryKey: ["users"],
    queryFn: API.getUsers,
    staleTime: 1000*60*5,
    gcTime: 1000*60*10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 1000*60*5,
    refetchOnMount: true,
    retry: 2,
    placeholderData: [],
    select: (users) => [...users].sort((a, b) => a.id - b.id),
  })
}
