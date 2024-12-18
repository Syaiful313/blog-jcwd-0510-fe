// app/transactions/[id]/page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const TransactionDetail = () => {
  // Sample transaction data
  const transaction = {
    id: 'TRX-001',
    eventName: 'Music Festival 2024',
    eventDate: '2024-12-20',
    quantity: 2,
    pricePerTicket: 300000,
    totalPrice: 600000,
    pointsUsed: 20000,
    finalPrice: 580000,
    status: 'waiting_for_payment',
    timeLeft: '01:30:45',
    paymentProof: null
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Detail Transaksi</CardTitle>
              <Badge 
                variant="outline" 
                className="bg-yellow-100 text-yellow-800"
              >
                Menunggu Pembayaran
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer */}
            {transaction.timeLeft && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600 text-center font-semibold">
                  Sisa waktu pembayaran: {transaction.timeLeft}
                </p>
              </div>
            )}

            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informasi Event</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama Event</p>
                  <p className="font-medium">{transaction.eventName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Event</p>
                  <p className="font-medium">
                    {new Date(transaction.eventDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jumlah Tiket</p>
                  <p className="font-medium">{transaction.quantity} tiket</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Harga per Tiket</p>
                  <p className="font-medium">{formatCurrency(transaction.pricePerTicket)}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Rincian Pembayaran</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Harga</span>
                  <span>{formatCurrency(transaction.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Poin Digunakan</span>
                  <span className="text-red-600">
                    - {formatCurrency(transaction.pointsUsed)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Pembayaran</span>
                  <span>{formatCurrency(transaction.finalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <Alert>
              <AlertDescription>
                <h4 className="font-semibold mb-2">Instruksi Pembayaran</h4>
                <p>Silakan transfer ke rekening berikut:</p>
                <div className="mt-2 space-y-1">
                  <p>Bank BCA</p>
                  <p className="font-medium">1234-5678-9012</p>
                  <p>a.n. PT Event Organizer</p>
                </div>
              </AlertDescription>
            </Alert>

            {/* Upload Payment Proof */}
            {transaction.status === 'waiting_for_payment' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Upload Bukti Pembayaran</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500 mb-2">
                    Klik atau seret file bukti pembayaran ke sini
                  </p>
                  <Button variant="outline">Pilih File</Button>
                </div>
                <Button className="w-full">Upload Bukti Pembayaran</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionDetail;