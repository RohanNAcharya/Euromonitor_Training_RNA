export interface Irequest {
    requestId: string;
    requestedby: string;
    requestedDate: string;
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
    approvalStatus: boolean;
    approverComments: string;
    withdrawn: boolean;
}