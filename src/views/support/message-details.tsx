'use client';

import cn from '@/utils/class-names';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Avatar, Button, Empty, Loader, Title } from 'rizzui';
import { z } from 'zod';
import { useElementSize } from '@/hooks/use-element-size';
import useMedia from 'react-use/lib/useMedia';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import MessageBody from './message-body';
import { Form } from '@/components/ui/form';
import { messages, MessageType } from '@/data/support-inbox';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const FormSchema = z.object({
  message: z.string({ required_error: 'Invalid email address' }),
});

type FormValues = {
  message: string;
};

export const messageIdAtom = atomWithStorage('messageId', "0239847207");
export const dataAtom = atomWithReset<MessageType[]>(messages);

export default function MessageDetails({ className }: { className?: string }) {
  const data = useAtomValue(dataAtom);
  const messageId = useAtomValue(messageIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, { width }] = useElementSize();
  const isWide = useMedia('(min-width: 1280px) and (max-width: 1440px)', false);

  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  const message = data.find((m) => m.id === messageId) ?? data[0];
  const initials = `${message?.firstName.charAt(0)}${message?.lastName.charAt(
    0
  )}`;

  // set default selected message when render complete
  useEffect(() => {
    // setFormWidth(width);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("data================>", data);
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Loader variant="spinner" size="xl" />
      </div>
    );
  }

  if (!message) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Empty
          text="No conversations selected"
          textClassName="mt-4 text-base text-gray-500"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative pt-6 lg:rounded-lg lg:border lg:border-muted lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6',
        className
      )}
    >
      <div>
        <header className="flex flex-col justify-between gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
          <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <Title as="h4" className="font-semibold">
              Support
            </Title>
          </div>
        </header>

        <div className="custom-scrollbar overflow-y-auto scroll-smooth @3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]">
          <div className="grid gap-8 py-5">
            <MessageBody />
            {/* <MessageBody />
            <MessageBody />
            <MessageBody /> */}
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-[32px_1fr] items-start gap-3 rounded-b-lg bg-white @3xl:pt-4 dark:bg-transparent lg:gap-4 lg:pl-0 dark:lg:pt-0 xl:grid-cols-[48px_1fr]"
        >
          <figure className="dark:mt-4">
            <Avatar
              name="John Doe"
              initials={initials}
              src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-14.png"
              className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-12 xl:!w-12"
            />
          </figure>
          <div
            className="relative rounded-lg border border-muted bg-gray-50 p-4 2xl:p-5"
            style={{
              maxWidth: formWidth(),
            }}
          >
            <Form<FormValues> onSubmit={onSubmit} validationSchema={FormSchema}>
              {({ control, watch, formState: { errors } }) => {
                return (
                  <>
                    <div className="relative mb-2.5 flex items-center justify-end">
                      <Button
                        type="submit"
                        className="dark:bg-gray-200 dark:text-white"
                      >
                        Send
                      </Button>
                    </div>

                    <Controller
                      control={control}
                      name="message"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="rounded-md bg-gray-0 dark:bg-gray-50 [&>.ql-container_.ql-editor]:min-h-[100px]"
                          error={errors?.message?.message}
                        />
                      )}
                    />
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  );
}
