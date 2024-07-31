import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';

type props = {
    value?: Date,
    onChange?: SelectSingleEventHandler,
    disabled?: boolean
}

const Datepicker = ({
    value,
    onChange,
    disabled
}: props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal z-10",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className='size-4 mr-2' />
                    {value ? format(value, "PPP") : <span>Pick a date</ span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default Datepicker