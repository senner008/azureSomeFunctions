import timerTrigger from "../TimerTrigger/index"
const context = require('./__STUBS__/DEFAULT_CONTEXT')
const timer = require('./__STUBS__/DEFAULT_TIMER')

describe(
    `
      Evaluate user created now
    `,
    () => {

        it('Timer trigger should log message', async () => {
            timerTrigger(context, timer);
            expect(context.log.mock.calls.length).toBe(1);
        })
    });