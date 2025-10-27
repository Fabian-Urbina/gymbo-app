import React, { useState } from "react";
import { IonButton, IonIcon, IonPopover, IonList, IonItem } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";

interface SettingsMenuProps {
  className?: string;
  onLogout: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ className, onLogout }) => {
    const [popoverEvent, setPopoverEvent] = useState<MouseEvent | null>(null);  

    return (
        <div className={className}>
            <IonButton onClick={(e) => setPopoverEvent(e.nativeEvent)}>
                <IonIcon icon={settingsOutline} />
            </IonButton>

            <IonPopover isOpen={!!popoverEvent} event={popoverEvent} onDidDismiss={() => setPopoverEvent(null)}>
                <IonList>
                    <IonItem button onClick={() => setPopoverEvent(null)}> Change Password </IonItem>
                    <IonItem button onClick={() => {setPopoverEvent(null); onLogout();}}> Log out </IonItem>
                </IonList>
            </IonPopover>
        </div>
    );
};

export default SettingsMenu;