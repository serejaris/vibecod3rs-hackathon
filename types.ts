
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface HackathonTrack {
  id: string;
  title: string;
  category: string;
  image: string;
  tag: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  TRACKS = 'tracks',
  VIBE = 'vibe',
  REGISTER = 'register',
}
