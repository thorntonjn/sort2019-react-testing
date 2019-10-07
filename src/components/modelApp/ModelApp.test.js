import React from 'react';
import Feedback from './ModelApp';
import { Machine, matchesState } from 'xstate';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createModel } from '@xstate/test/lib';

// describe('feedback app', () => {
//   afterEach(cleanup);

//   it('should show the thanks screen when "Good" is clicked', () => {
//     const { getByTestId } = render(<Feedback />);

//     // The question screen should be visible at first
//     expect(getByTestId('question-screen')).toBeTruthy();

//     // Click the "Good" button
//     fireEvent.click(getByTestId('good-button'));

//     // Now the thanks screen should be visible
//     expect(getByTestId('thanks-screen')).toBeOk();
//   });

//   it('should show the form screen when "Bad" is clicked', () => {
//     const { getByTestId } = render(<Feedback />);

//     // The question screen should be visible at first
//     expect(getByTestId('question-screen')).toBeTruthy();

//     // Click the "Bad" button
//     fireEvent.click(getByTestId('bad-button'));

//     // Now the form screen should be visible
//     expect(getByTestId('form-screen')).toBeTruthy();
//   });
// });

// ............

describe('feedback app', () => {
  const feedbackMachine = Machine({
    id: 'feedback',
    initial: 'question',
    states: {
      question: {
        on: {
          CLICK_GOOD: 'thanks',
          CLICK_BAD: 'form',
          CLOSE: 'closed'
        },
        meta: {
          test: ({ getByTestId }) => {
            expect(getByTestId('question-screen')).toBeTruthy();
          }
        }
      },
      form: {
        on: {
          SUBMIT: [
            {
              target: 'thanks',
              cond: (_, e) => e.value.length
            }
          ],
          CLOSE: 'closed'
        },
        meta: {
          test: ({ getByTestId }) => {
            expect(getByTestId('form-screen')).toBeTruthy();
          }
        }
      },
      thanks: {
        on: {
          CLOSE: 'closed'
        },
        meta: {
          test: ({ getByTestId }) => {
            expect(getByTestId('thanks-screen')).toBeTruthy();
          }
        }
      },
      closed: {
        type: 'final',
        meta: {
          test: ({ queryByTestId, debug }) => {
            expect(queryByTestId('thanks-screen')).toBeNull();
          }
        }
      }
    }
  });


  const testModel = createModel(feedbackMachine, {
    events: {
      CLICK_GOOD: ({ getByText }) => {
        fireEvent.click(getByText('Good'));
      },
      CLICK_BAD: ({ getByText }) => {
        fireEvent.click(getByText('Bad'));
      },
      CLOSE: ({ getByTestId }) => {
        fireEvent.click(getByTestId('close-button'));
      },
      ESC: ({ baseElement }) => {
        fireEvent.keyDown(baseElement, { key: 'Escape' });
      },
      SUBMIT: {
        exec: async ({ getByTestId }, event) => {
          fireEvent.change(getByTestId('response-input'), {
            target: { value: event.value }
          });
          fireEvent.click(getByTestId('submit-button'));
        },
        cases: [{ value: 'something' }, { value: '' }]
      }
    }
  });

  // const feedbackModel = createModel(feedbackMachine)
  // .withEvents({
  //   // getByTestId, etc. will be passed into path.test(...) later.
  //   CLICK_GOOD: ({ getByText }) => {
  //     fireEvent.click(getByText('Good'));
  //   },
  //   CLICK_BAD: ({ getByText }) => {
  //     fireEvent.click(getByText('Bad'));
  //   },
  //   CLOSE: ({ getByTestId }) => {
  //     fireEvent.click(getByTestId('close-button'));
  //   },
  //   ESC: ({ baseElement }) => {
  //       fireEvent.keyDown(baseElement, { key: 'Escape' });
  //   },
  //   SUBMIT: {
  //     exec: async ({ getByTestId }, event) => {
  //       fireEvent.change(getByTestId('response-input'), {
  //         target: { value: event.value }
  //       });
  //       fireEvent.click(getByTestId('submit-button'));
  //     },
  //     cases: [{ value: 'something' }, { value: '' }]
  //   }
  // });

  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      afterEach(cleanup);

      plan.paths.forEach(path => {
        it(path.description, () => {
          const rendered = render(<Feedback />);
          return path.test(rendered);
        });
      });
    });
  });


  it('coverage', () => {
    testModel.testCoverage();
  });
});