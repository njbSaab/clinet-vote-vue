// src/types/api.ts
export interface PublicEvent {
  id: number,
  typeEventId: string,
  title: string,
  sport: string,
  participantA: string,
  participantB: string,
  logoA: string,
  logoB: string,
  result: string | null,
  eventStartsAt: string,
  votingEndsAt: string,
  totalVotes: number,
  isMainEvent: boolean,
  imageBgDesktop: string,
  imageBgMobile: string,
  grandPrize: string,
  percentageA: string,
  percentageB: string,
  percentageDraw: boolean,
  hasVotingEnded: boolean,
  userAlreadyVoted: boolean,
  userChoice: 1 | 2 | 3 | null
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