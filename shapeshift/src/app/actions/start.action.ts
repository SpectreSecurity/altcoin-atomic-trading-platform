import {Action} from '@ngrx/store';

export const SWAP_DEPOSIT_RECEIVE_COINS = 'SWAP_DEPOSIT_RECEIVE_COINS';
export const START_SWAP = 'START_SWAP';
export const SET_LINK = 'SET_LINK';
export const WAIT_FOR_INITIATE = 'WAIT_FOR_INITIATE';
export const WAIT_FOR_INITIATE_SUCCESS = 'WAIT_FOR_INITIATE_SUCCESS';
export const INFORM_INITIATED = 'INFORM_INITIATED';


export const SET_DEPOSIT_AMOUNT = 'SET_DEPOSIT_AMOUNT';
export const SET_RECEIVE_AMOUNT = 'SET_RECEIVE_AMOUNT';

export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP';
export const COMPLETE_SWAP = 'COMPLETE_SWAP';

export class SwapDepositReceiveCoinsAction implements Action {
  readonly type = SWAP_DEPOSIT_RECEIVE_COINS;
}

export class StartSwapAction implements Action {
  readonly type = START_SWAP;

  constructor(public payload: { depositCoin, receiveCoin }) {

  }
}

export class SetLinkAction implements Action {
  readonly type = SET_LINK;

  constructor(public payload: string) {

  }
}


export class SetActiveStepAction implements Action {
  readonly type = SET_ACTIVE_STEP;

  constructor(public payload: number) {

  }
}

export class SetDepositAmountAction implements Action {
  readonly type = SET_DEPOSIT_AMOUNT;

  constructor(public payload: number) {

  }
}

export class SetReceiveAmountAction implements Action {
  readonly type = SET_RECEIVE_AMOUNT;

  constructor(public payload: number) {

  }
}

export class CompleteSwapAction implements Action {
  readonly type = COMPLETE_SWAP;

  constructor() {

  }
}

export class WaitForInitiateAction implements Action {
  readonly type = WAIT_FOR_INITIATE;

  constructor(public payload: string) {

  }
}

export class WaitForInitiateSuccessAction implements Action {
  readonly type = WAIT_FOR_INITIATE_SUCCESS;

  constructor(public payload: any) {
    console.log(payload);
  }
}

export class InformInitiatedAction implements Action {
  readonly type = INFORM_INITIATED;

  constructor(public payload?: any) {

  }
}

export type Actions =
  SwapDepositReceiveCoinsAction
  | StartSwapAction
  | SetLinkAction
  | SetActiveStepAction
  | SetDepositAmountAction
  | SetReceiveAmountAction
  | CompleteSwapAction
  | WaitForInitiateAction
  | InformInitiatedAction
  | WaitForInitiateSuccessAction
  ;