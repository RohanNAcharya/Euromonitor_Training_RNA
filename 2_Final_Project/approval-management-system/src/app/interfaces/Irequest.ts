export interface Irequest {
    requestId: string;
    requestedBy: string;
    requestedDate: Date;
    purpose: string;
    description: string;
    approver: string;
    estimatedCost: string;
    advanceAmount: string;
    planDate: string;
    spentAmount: string;
    userComments: string;
    documents: string;
    uploadStatus: boolean;
    requestDate: string;
    approvalStatus: string;
    approverComments: string;
    withdrawn: boolean;
    id?: number;
}