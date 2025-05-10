import { Spin } from "antd";
import { Alert } from "antd";
import { ReactElement } from "react";

interface StatusDisplayProps {
  isLoading: boolean;
  error: Error | null;
  hasData?: boolean;
  children: ReactElement;
}

/**
 * 데이터 로딩, 에러 상태를 표시하는 컴포넌트
 */ 
const StatusDisplay = ({ isLoading, error, hasData, children } : StatusDisplayProps) => {

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Spin tip="Loading..." />
    </div>;
  }

  if (error) {
    return <Alert type="error" message="데이터를 불러오는 중 오류가 발생했습니다." />;
  }

  if (hasData === false) {
    return <Alert type="warning" message="데이터가 없습니다." />;
  }

  return <>{children}</>;
};

export default StatusDisplay;