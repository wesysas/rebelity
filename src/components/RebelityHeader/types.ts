
export type Pages = {
  title: string;
  path: string;
  icon: string;
}

export type RebelityHeaderProps = {
  isClockedIn: boolean;
  currentRole: number;
  activeMenu: string;
  setActiveMenu: (nav: string) => Promise<string>;
  logoutAdmin: () => Promise<any>;
  exitPinUser: () => Promise<any>;
  clearOrder: () => Promise<any>;
}
