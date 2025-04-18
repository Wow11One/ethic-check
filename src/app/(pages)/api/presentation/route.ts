import { generatePresentation } from '@/services/presentationService';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const presentation = await generatePresentation(req.nextUrl.searchParams.get('requestId')!);

    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    headers.set('Content-Disposition', 'attachment; filename=Pitchdeck presentation.pptx');

    return new NextResponse(presentation, { status: 200, statusText: "OK", headers });
}
