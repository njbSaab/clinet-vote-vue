// src/types/api.ts
export interface EventData {
    id: number;
    typeEventId: string;
    name: string;
    type: string;
    endAt: string;  // ISO string, можно Date в будущем
    memberA: string;
    memberB: string;
    imageMemberA: string;
    imageMemberB: string;
    imageBgDesk: string;
    imageBgMob: string;
    result: null | unknown;  // Пока null, уточни тип позже
    grandPrize: string;
    everyoneForPrize: string;
    status: 'active' | 'inactive' | 'ended';  // Union для статусов
    createdAt: string;
    landing_url: string;
  }
  
  // Опционально: тип для ошибки (если API возвращает { success: false, error: ... })
  export interface ApiError {
    success: false;
    error: {
      issues: Array<{
        validation: string;
        code: string;
        message: string;
        path: string[];
      }>;
      name: string;
    };
  }