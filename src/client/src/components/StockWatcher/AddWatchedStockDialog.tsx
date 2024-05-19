import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useCreateWatchedStock } from 'hooks/useCreateWatchedStock';
import { useStockTickers } from 'hooks/useStockTickers';
import { useWatchedStocks } from 'hooks/useWatchedStocks';
import React from 'react';

type Props = {
  onClose: () => void;
};

type FormValues = {
  symbol: string;
};

const AddWatchedStockDialog: React.FC<Props> = ({ onClose }) => {
  const { data: stockTickers = [], isPending: isStockTickerPending } = useStockTickers();
  const { data: watchedStocks = [], isPending: isWatchedStocksPending } = useWatchedStocks();
  const { mutate: createWatchedStockMutate, isPending } = useCreateWatchedStock();
  const queryClient = useQueryClient();

  const handleformSubmit = (values: FormValues) => {
    createWatchedStockMutate(values.symbol, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['watchedStocks'] });
        onClose();
      },
    });
  };

  const { handleSubmit, handleChange, handleBlur, values, errors } = useFormik({
    initialValues: {
      symbol: '',
    },
    onSubmit: handleformSubmit,
  });

  const filteredTickers = stockTickers.filter(
    (ticker) => !watchedStocks.find(({ symbol }) => symbol === ticker.symbol),
  );

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Add stock to watch list</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {(isStockTickerPending || isWatchedStocksPending) && (
            <Skeleton width="100%" height="150px" />
          )}
          {!isStockTickerPending && !isWatchedStocksPending && (
            <FormControl fullWidth>
              <InputLabel>Stock</InputLabel>
              <Select
                value={values.symbol}
                label="Symbol"
                name="symbol"
                onChange={handleChange}
                onBlur={handleBlur}>
                {filteredTickers.map((ticker) => (
                  <MenuItem key={ticker.symbol} value={ticker.symbol}>
                    {`${ticker.symbol} (${ticker.name})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={!!errors.symbol}
            loading={isPending}>
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
      ;
    </Dialog>
  );
};

export default AddWatchedStockDialog;
