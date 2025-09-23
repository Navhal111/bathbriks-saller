"use client";

import KitTextInput from "@/kit/components/KitTextInput/KitTextInput";
import { Title } from "rizzui";
import { Grid } from "rizzui";
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import KitButton from "@/kit/components/KitButton/KitButton";
import { CustomErrorType } from "@/kit/models/CustomError";
import toast from "react-hot-toast";
import { CategoryType } from "@/kit/models/Category";
import { useCreateWallet } from "@/kit/hooks/data/wallet";
import DateFiled from "@/components/controlled-table/date-field";
import dayjs from "dayjs";

interface Props {
    onRefresh?: () => void
}

interface FormData {
    amount: string
    date: string
}

const formSchema = yup.object().shape({
    amount: yup.string().required('Amount is a required'),
    date: yup.string().required(),
})

export default function WithdrawlPage({ onRefresh }: Props) {

    const { createWallet: onCreateWallet, isCreatingWallet } = useCreateWallet()

    const defaultValues: FormData = {
        amount: '',
        date: '',
    }

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    })

    const isBtnLoading = isCreatingWallet

    const onSubmit = async (data: FormData) => {
        const payload = {
            amount: data.amount,
            date: data?.date ? dayjs(data.date).format('DD-MMM-YYYY') : '',
        };

        try {
            await onCreateWallet(payload as Partial<CategoryType>)
            toast.success('Category created successfully.')
            onRefresh?.()
        } catch (error) {
            toast.error((error as CustomErrorType)?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 flex items-center justify-between">
                <Title as="h5">Withdrawl</Title>
            </div>
            <Grid >
                <Grid.Col >
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field: { value, onChange, ref } }) => (
                            <div className="w-full">
                                <KitTextInput
                                    ref={ref}
                                    label='Amount'
                                    required
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Enter Amount"
                                    type="number"
                                    error={errors.amount && errors.amount.message}
                                    onKeyDown={(e) => {
                                        if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
                                    }}
                                />
                            </div>
                        )}
                    />
                </Grid.Col>
                <Grid.Col>
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <DateFiled
                                    dateFormat={'dd-MMM-yyyy'}
                                    className="w-full"
                                    placeholderText="Select Date"
                                    popperPlacement="bottom-start"
                                    popperClassName="z-1000"
                                    wrapperClassName="w-full"
                                    selected={field.value ? new Date(field.value) : null}
                                    onChange={(dates) => field.onChange(dates)}
                                    minDate={new Date()}
                                    inputProps={{
                                        label: 'Date',
                                    }}
                                />
                                {errors?.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
                            </div>
                        )}
                    />
                </Grid.Col>
            </Grid>
            <Grid className="flex justify-end mt-3 gap-3">
                <KitButton
                    variant="solid"
                    color="primary"
                    className='w-[80px]'
                    type="submit"
                    isLoading={isBtnLoading}
                >
                    Submit
                </KitButton>
            </Grid>
        </form>
    );
}